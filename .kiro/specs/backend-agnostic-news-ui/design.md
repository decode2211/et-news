# Design Document: Backend-Agnostic News UI

## Overview

The backend-agnostic news UI is a Next.js 14 (App Router) frontend shell that connects to any conforming REST backend. The system is organized around clean data contracts, a centralized API service layer, and a four-state component model (Loading → Error → Empty → Data). All intelligence lives in the backend; the frontend is purely responsible for experience.

The stack:
- **Next.js 14** (App Router) — routing, SSR/CSR, dynamic segments
- **TypeScript** — strict type safety across all layers
- **Tailwind CSS** — utility-first styling with dark mode via `class` strategy
- **ShadCN UI** — accessible, composable base components
- **Zustand** — lightweight global state (no boilerplate)
- **Axios** — HTTP client with interceptors for error normalization
- **Framer Motion** — declarative animations for page and component transitions

---

## Architecture

The application follows a layered architecture with strict separation of concerns:

```
┌─────────────────────────────────────────────────────┐
│                     Pages (App Router)               │
│         /  (Feed)    /briefing/[id]   /chat          │
└──────────────────────┬──────────────────────────────┘
                       │ uses
┌──────────────────────▼──────────────────────────────┐
│                   Components                         │
│  NewsCard  BriefingView  ChatBubble  Skeletons       │
│  Layout    Sidebar       RightPanel  ErrorState      │
└──────────────────────┬──────────────────────────────┘
                       │ reads/writes
┌──────────────────────▼──────────────────────────────┐
│                  Zustand Store                       │
│              userProfile, setUser                    │
└──────────────────────┬──────────────────────────────┘
                       │ calls
┌──────────────────────▼──────────────────────────────┐
│                  API Service Layer                   │
│         getNews()  getBriefing()  sendMessage()      │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP
┌──────────────────────▼──────────────────────────────┐
│                  Backend (any)                       │
│         GET /api/news   GET /api/briefing/:id        │
│         POST /api/chat                               │
└─────────────────────────────────────────────────────┘
```

### Data Flow

1. A page component mounts and triggers a fetch via the API service layer
2. While in-flight, the page renders the appropriate Skeleton component
3. On success with data → renders the content component
4. On success with empty array → renders the Empty state component
5. On failure → renders the Error state component with a retry callback
6. User interactions (retry, navigation, chat) flow back through the same pipeline

---

## Components and Interfaces

### Directory Structure

```
/
├── app/
│   ├── layout.tsx              # Root layout (wraps all pages with Layout shell)
│   ├── page.tsx                # Feed page (/)
│   ├── briefing/
│   │   └── [id]/
│   │       └── page.tsx        # Briefing page (/briefing/:id)
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx       # Sidebar + Feed + RightPanel shell
│   │   ├── Sidebar.tsx         # Fixed left navigation
│   │   └── RightPanel.tsx      # Optional right panel
│   ├── feed/
│   │   ├── NewsCard.tsx        # Single news item card
│   │   ├── NewsFeed.tsx        # List of NewsCards with four-state logic
│   │   └── FeedSkeleton.tsx    # Skeleton placeholder for feed
│   ├── briefing/
│   │   ├── BriefingView.tsx    # Full briefing content display
│   │   └── BriefingSkeleton.tsx
│   ├── chat/
│   │   ├── ChatPanel.tsx       # Full chat UI (bubbles + input)
│   │   ├── ChatBubble.tsx      # Single message bubble
│   │   └── TypingIndicator.tsx # Animated typing dots
│   ├── ui/
│   │   ├── ErrorState.tsx      # Reusable error state with retry
│   │   └── EmptyState.tsx      # Reusable empty state
│   └── theme/
│       └── ThemeToggle.tsx     # Dark/light mode toggle
├── services/
│   ├── api.ts                  # Axios instance + base config
│   ├── newsService.ts          # getNews()
│   ├── briefingService.ts      # getBriefing()
│   └── chatService.ts          # sendMessage()
├── store/
│   └── userStore.ts            # Zustand store for UserProfile
├── types/
│   └── index.ts                # All TypeScript interfaces
└── lib/
    └── utils.ts                # cn() helper and shared utilities
```

### Component Interfaces

#### AppLayout
```typescript
interface AppLayoutProps {
  children: React.ReactNode;
  showRightPanel?: boolean;
  rightPanelContent?: React.ReactNode;
}
```

#### NewsCard
```typescript
interface NewsCardProps {
  item: NewsItem;
  onClick: (id: string) => void;
}
```

#### NewsFeed
```typescript
// Internal state managed by the component
// Props: none (fetches its own data)
```

#### BriefingView
```typescript
interface BriefingViewProps {
  briefing: Briefing;
}
```

#### ChatPanel
```typescript
// Self-contained; manages its own message list and input state
```

#### ErrorState
```typescript
interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}
```

#### EmptyState
```typescript
interface EmptyStateProps {
  message: string;
  onRetry?: () => void;
}
```

---

## Data Models

### TypeScript Interfaces (`/types/index.ts`)

```typescript
export type Sentiment = "positive" | "negative" | "neutral";
export type Impact = "low" | "medium" | "high";
export type UserType = "investor" | "student" | "founder";
export type MessageRole = "user" | "assistant";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  sentiment: Sentiment;
  impact: Impact;
  entities: string[];
  category: string;
}

export interface Briefing {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  impactAnalysis: string;
}

export interface UserProfile {
  type: UserType;
  interests: string[];
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ApiError {
  status: number;
  message: string;
}
```

### API Service Layer (`/services/`)

#### Base Axios Instance (`api.ts`)
```typescript
// Reads NEXT_PUBLIC_API_BASE_URL from environment
// Attaches response interceptor to normalize errors into ApiError shape
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
```

#### Service Functions
```typescript
// newsService.ts
export async function getNews(): Promise<NewsItem[]>

// briefingService.ts
export async function getBriefing(id: string): Promise<Briefing>

// chatService.ts
export async function sendMessage(message: string): Promise<ChatMessage>
```

### Zustand Store (`/store/userStore.ts`)

```typescript
interface UserStore {
  userProfile: UserProfile | null;
  setUser: (profile: UserProfile) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userProfile: null,
  setUser: (profile) => set({ userProfile: profile }),
}));
```

### Four-State Hook Pattern

Each data-fetching component uses a shared async state pattern:

```typescript
type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: ApiError }
  | { status: "empty" }
  | { status: "success"; data: T };
```

A custom hook `useFetch<T>(fetcher: () => Promise<T>)` encapsulates this pattern, returning the current `FetchState<T>` and a `retry()` function.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: API error normalization is total

*For any* HTTP response with a non-2xx status code, the API service layer should throw an `ApiError` object containing a numeric `status` field and a non-empty `message` string — never a raw or untyped error.

**Validates: Requirements 2.4**

---

### Property 2: Four-state transitions are exhaustive

*For any* component using the `useFetch` hook, the rendered output must correspond to exactly one of the four states (loading, error, empty, success) — no state combination should produce an undefined or blank render.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

---

### Property 3: Retry re-initiates the fetch

*For any* component in the error state, clicking the retry button should transition the component back to the loading state and re-invoke the original fetcher function.

**Validates: Requirements 3.5, 5.4, 6.4**

---

### Property 4: NewsCard renders all required fields

*For any* valid `NewsItem` object, rendering a `NewsCard` should produce output that contains the item's `title`, `summary`, `sentiment`, `impact`, and `category` values.

**Validates: Requirements 5.5**

---

### Property 5: BriefingView renders all required fields

*For any* valid `Briefing` object, rendering a `BriefingView` should produce output that contains the `title`, `summary`, each element of `keyPoints`, and `impactAnalysis`.

**Validates: Requirements 6.3**

---

### Property 6: Chat send button disabled on empty input

*For any* chat input state where the trimmed input string is empty, the send button should be in a disabled state and submitting should not invoke `sendMessage`.

**Validates: Requirements 7.6**

---

### Property 7: Chat message append on success

*For any* non-empty message string, after `sendMessage()` resolves successfully, the chat message list should contain both the original user message and the returned assistant `ChatMessage`.

**Validates: Requirements 7.3, 7.4**

---

### Property 8: Zustand store setUser is idempotent on same value

*For any* `UserProfile` value, calling `setUser` with the same profile twice should result in the store holding that profile — the store should never enter an inconsistent state from repeated calls.

**Validates: Requirements 8.2, 8.3**

---

### Property 9: FeedSkeleton and BriefingSkeleton render without data

*For any* render of `FeedSkeleton` or `BriefingSkeleton`, the components should render successfully without requiring any props — they are purely presentational placeholders.

**Validates: Requirements 9.1, 9.2**

---

## Error Handling

### API Layer Errors

All errors from the API service layer are normalized into `ApiError` via an Axios response interceptor:

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      status: error.response?.status ?? 0,
      message: error.response?.data?.message ?? "An unexpected error occurred",
    };
    return Promise.reject(apiError);
  }
);
```

This ensures every component receives a consistent error shape regardless of the backend's error format.

### Component-Level Error Handling

- Each data-fetching component catches errors from the service layer and transitions to the `error` FetchState
- The `ErrorState` component renders the `message` from `ApiError` and exposes a retry callback
- Chat errors are displayed inline within the chat panel (not as a full-page error state)

### Network / Environment Errors

- If `NEXT_PUBLIC_API_BASE_URL` is not set, the Axios instance will use a relative base URL, which will fail gracefully with a network error caught by the interceptor
- No silent failures — all errors surface to the user via the error state UI

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are used. They are complementary:
- **Unit tests** verify specific examples, edge cases, and integration points
- **Property tests** verify universal correctness across all valid inputs

### Property-Based Testing

**Library**: `fast-check` (TypeScript-native, works with Jest/Vitest)

Each correctness property from the design document maps to exactly one property-based test. Tests run a minimum of **100 iterations** each.

Tag format per test:
```
// Feature: backend-agnostic-news-ui, Property N: <property_text>
```

**Properties to implement as PBT:**
- Property 1 → API error normalization (arbitrary HTTP status codes)
- Property 2 → Four-state exhaustiveness (arbitrary fetch outcomes)
- Property 3 → Retry re-initiates fetch (arbitrary error states)
- Property 4 → NewsCard field rendering (arbitrary NewsItem values)
- Property 5 → BriefingView field rendering (arbitrary Briefing values)
- Property 6 → Chat send button disabled on empty/whitespace input
- Property 7 → Chat message append on success (arbitrary message strings)
- Property 8 → Zustand setUser idempotence (arbitrary UserProfile values)
- Property 9 → Skeleton renders without props

### Unit Tests

- Axios interceptor error normalization with specific HTTP codes (400, 401, 404, 500)
- `useFetch` hook state transitions with mocked fetchers
- `NewsCard` click handler invokes `onClick` with correct `id`
- Briefing page extracts route param and calls `getBriefing(id)`
- Chat input disables send button when empty, enables when non-empty
- `EmptyState` and `ErrorState` render correct messages

### Test Configuration

- **Framework**: Vitest + React Testing Library
- **PBT Library**: fast-check
- **Minimum PBT iterations**: 100 per property
- **Coverage target**: All service functions, all hooks, all stateful components
