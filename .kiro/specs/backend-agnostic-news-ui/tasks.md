# Implementation Plan: Backend-Agnostic News UI

## Overview

Scaffold a Next.js 14 (App Router) frontend shell with TypeScript, Tailwind CSS, ShadCN UI, Zustand, Axios, and Framer Motion. The implementation follows a layered architecture: types → services → store → hooks → components → pages → tests.

## Tasks

- [x] 1. Project setup and configuration
  - Initialize Next.js 14 project with TypeScript and App Router
  - Configure Tailwind CSS with dark mode (`class` strategy) and custom design tokens
  - Install and configure ShadCN UI
  - Install Zustand, Axios, Framer Motion
  - Install Vitest, React Testing Library, fast-check, and jsdom
  - Configure `vitest.config.ts` with jsdom environment and path aliases
  - Create `.env.local` with `NEXT_PUBLIC_API_BASE_URL` placeholder
  - _Requirements: 2.6, 10.1, 10.4_

- [x] 2. TypeScript type definitions
  - [x] 2.1 Create `/types/index.ts` with all interfaces
    - Define `Sentiment`, `Impact`, `UserType`, `MessageRole` union types
    - Define `NewsItem`, `Briefing`, `UserProfile`, `ChatMessage`, `ApiError` interfaces
    - Define `FetchState<T>` discriminated union type
    - Export all types
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 3. API service layer
  - [x] 3.1 Create `/services/api.ts` — Axios base instance
    - Read `NEXT_PUBLIC_API_BASE_URL` from env
    - Attach response interceptor normalizing all non-2xx responses into `ApiError`
    - _Requirements: 2.4, 2.5, 2.6_
  - [x] 3.2 Create `/services/newsService.ts` — `getNews()`
    - GET `/api/news`, return `Promise<NewsItem[]>`
    - _Requirements: 2.1_
  - [x] 3.3 Create `/services/briefingService.ts` — `getBriefing(id)`
    - GET `/api/briefing/:id`, return `Promise<Briefing>`
    - _Requirements: 2.2_
  - [x] 3.4 Create `/services/chatService.ts` — `sendMessage(message)`
    - POST `/api/chat`, return `Promise<ChatMessage>`
    - _Requirements: 2.3_
  - [ ]* 3.5 Write property test for API error normalization (Property 1)
    - **Property 1: API error normalization is total**
    - **Validates: Requirements 2.4**
    - Use fast-check to generate arbitrary non-2xx status codes and verify `ApiError` shape
    - _Feature: backend-agnostic-news-ui, Property 1_

- [x] 4. Zustand store
  - [x] 4.1 Create `/store/userStore.ts`
    - `userProfile: UserProfile | null` initialized to `null`
    - `setUser(profile: UserProfile)` action
    - _Requirements: 8.1, 8.2, 8.3, 8.4_
  - [ ]* 4.2 Write property test for store idempotence (Property 8)
    - **Property 8: Zustand setUser is idempotent on same value**
    - **Validates: Requirements 8.2, 8.3**
    - _Feature: backend-agnostic-news-ui, Property 8_

- [x] 5. useFetch custom hook
  - [x] 5.1 Create `/hooks/useFetch.ts`
    - Accept `fetcher: () => Promise<T>` and return `{ state: FetchState<T>, retry: () => void }`
    - Handle loading → success/error/empty transitions
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [ ]* 5.2 Write property test for four-state exhaustiveness (Property 2)
    - **Property 2: Four-state transitions are exhaustive**
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4**
    - _Feature: backend-agnostic-news-ui, Property 2_
  - [ ]* 5.3 Write property test for retry behavior (Property 3)
    - **Property 3: Retry re-initiates the fetch**
    - **Validates: Requirements 3.5, 5.4, 6.4**
    - _Feature: backend-agnostic-news-ui, Property 3_

- [x] 6. Shared UI primitives
  - [x] 6.1 Create `/lib/utils.ts` with `cn()` helper
  - [x] 6.2 Create `/components/ui/ErrorState.tsx`
    - Props: `message: string`, `onRetry: () => void`
    - _Requirements: 3.2, 3.5_
  - [x] 6.3 Create `/components/ui/EmptyState.tsx`
    - Props: `message: string`, `onRetry?: () => void`
    - _Requirements: 3.3_

- [x] 7. Layout components
  - [x] 7.1 Create `/components/layout/Sidebar.tsx`
    - Fixed left navigation with nav links
    - Collapses to icon-only below tablet breakpoint
    - _Requirements: 4.1, 4.4_
  - [x] 7.2 Create `/components/layout/RightPanel.tsx`
    - Optional right panel, shown/hidden via prop
    - _Requirements: 4.3_
  - [x] 7.3 Create `/components/layout/AppLayout.tsx`
    - Compose Sidebar + main content + optional RightPanel
    - Props: `children`, `showRightPanel?`, `rightPanelContent?`
    - _Requirements: 4.1, 4.2, 4.3, 4.5_
  - [x] 7.4 Create `/components/theme/ThemeToggle.tsx`
    - Toggle dark/light mode via `next-themes` or class strategy
    - _Requirements: 10.1_

- [x] 8. Feed components
  - [x] 8.1 Create `/components/feed/FeedSkeleton.tsx`
    - Render 5 placeholder cards matching NewsCard shape
    - _Requirements: 9.1_
  - [ ]* 8.2 Write property test for FeedSkeleton renders without props (Property 9)
    - **Property 9: FeedSkeleton renders without data**
    - **Validates: Requirements 9.1**
    - _Feature: backend-agnostic-news-ui, Property 9_
  - [x] 8.3 Create `/components/feed/NewsCard.tsx`
    - Props: `item: NewsItem`, `onClick: (id: string) => void`
    - Display `title`, `summary`, `sentiment`, `impact`, `category`
    - Framer Motion hover transition
    - _Requirements: 5.5, 10.3_
  - [ ]* 8.4 Write property test for NewsCard field rendering (Property 4)
    - **Property 4: NewsCard renders all required fields**
    - **Validates: Requirements 5.5**
    - _Feature: backend-agnostic-news-ui, Property 4_
  - [x] 8.5 Create `/components/feed/NewsFeed.tsx`
    - Use `useFetch(getNews)` internally
    - Render FeedSkeleton / ErrorState / EmptyState / list of NewsCards
    - Navigate to `/briefing/:id` on card click
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 9. Briefing components
  - [x] 9.1 Create `/components/briefing/BriefingSkeleton.tsx`
    - Placeholder blocks matching BriefingView shape
    - _Requirements: 9.2_
  - [ ]* 9.2 Write property test for BriefingSkeleton renders without props (Property 9)
    - **Property 9: BriefingSkeleton renders without data**
    - **Validates: Requirements 9.2**
    - _Feature: backend-agnostic-news-ui, Property 9_
  - [x] 9.3 Create `/components/briefing/BriefingView.tsx`
    - Props: `briefing: Briefing`
    - Display `title`, `summary`, `keyPoints` list, `impactAnalysis`
    - _Requirements: 6.3_
  - [ ]* 9.4 Write property test for BriefingView field rendering (Property 5)
    - **Property 5: BriefingView renders all required fields**
    - **Validates: Requirements 6.3**
    - _Feature: backend-agnostic-news-ui, Property 5_

- [x] 10. Chat components
  - [x] 10.1 Create `/components/chat/TypingIndicator.tsx`
    - Animated three-dot typing indicator
    - _Requirements: 9.3_
  - [x] 10.2 Create `/components/chat/ChatBubble.tsx`
    - Props: `message: ChatMessage`
    - Visually distinguish user vs assistant messages
    - _Requirements: 7.1_
  - [x] 10.3 Create `/components/chat/ChatPanel.tsx`
    - Self-contained: manages message list and input state
    - Scrollable bubble list, input box, send button
    - Disable send when input is empty/whitespace
    - Show TypingIndicator while awaiting response
    - Inline error on `sendMessage()` failure
    - Append assistant message on success
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_
  - [ ]* 10.4 Write property test for send button disabled on empty input (Property 6)
    - **Property 6: Chat send button disabled on empty input**
    - **Validates: Requirements 7.6**
    - _Feature: backend-agnostic-news-ui, Property 6_
  - [ ]* 10.5 Write property test for chat message append on success (Property 7)
    - **Property 7: Chat message append on success**
    - **Validates: Requirements 7.3, 7.4**
    - _Feature: backend-agnostic-news-ui, Property 7_

- [x] 11. Pages (App Router)
  - [x] 11.1 Create `app/globals.css` with Tailwind directives and CSS variables for design tokens
  - [x] 11.2 Create `app/layout.tsx` — root layout wrapping all pages with AppLayout
    - _Requirements: 4.5_
  - [x] 11.3 Create `app/page.tsx` — Feed page
    - Render `NewsFeed` component
    - Framer Motion page entry animation
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 10.2_
  - [x] 11.4 Create `app/briefing/[id]/page.tsx` — Briefing page
    - Extract `id` from route params, call `getBriefing(id)` via `useFetch`
    - Render BriefingSkeleton / ErrorState / BriefingView
    - Framer Motion page entry animation
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 10.2_

- [-] 12. Checkpoint — ensure all tests pass
  - Run `vitest --run` and confirm all tests pass. Ask the user if any questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use fast-check with minimum 100 iterations each
- Design tokens: bg `#0B0F14`, card `#111827`, accent `#6366F1`, positive `#22C55E`, negative `#EF4444`, text `#E5E7EB`
