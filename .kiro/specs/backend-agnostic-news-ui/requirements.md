# Requirements Document

## Introduction

A backend-agnostic frontend shell for a news and briefing application built with Next.js, Tailwind CSS, ShadCN UI, and Zustand. The system provides a plug-and-play UI with clean data contracts, comprehensive loading/error/empty/data states, and a layout system that connects to any backend via a well-defined API service layer. No mock data — all components are API-driven and production-ready.

## Glossary

- **NewsItem**: A single news article object with id, title, summary, sentiment, impact, entities, and category fields
- **Briefing**: A structured summary object with title, summary, keyPoints, and impactAnalysis fields
- **UserProfile**: A user configuration object with type (investor/student/founder) and interests fields
- **Feed**: The scrollable list of NewsItem cards displayed on the main page
- **API_Service**: The service layer responsible for all HTTP communication with the backend
- **Store**: The Zustand global state manager holding UserProfile and related actions
- **Skeleton**: A placeholder loading component that mimics the shape of real content
- **Feed_Page**: The main page displaying the news feed at the root route
- **Briefing_Page**: The dynamic page displaying a single briefing at `/briefing/:id`
- **Chat_Component**: The interactive chat UI component for sending and receiving messages
- **Layout**: The top-level shell composed of Sidebar, Feed area, and optional Right Panel

## Requirements

### Requirement 1: TypeScript Data Contracts

**User Story:** As a frontend developer, I want strongly-typed data contracts, so that I can safely integrate with any backend that conforms to the defined API shapes.

#### Acceptance Criteria

1. THE System SHALL define a `NewsItem` TypeScript interface with fields: `id` (string), `title` (string), `summary` (string), `sentiment` (`"positive" | "negative" | "neutral"`), `impact` (`"low" | "medium" | "high"`), `entities` (string array), and `category` (string)
2. THE System SHALL define a `Briefing` TypeScript interface with fields: `id` (string), `title` (string), `summary` (string), `keyPoints` (string array), and `impactAnalysis` (string)
3. THE System SHALL define a `UserProfile` TypeScript interface with fields: `type` (`"investor" | "student" | "founder"`), and `interests` (string array)
4. THE System SHALL define a `ChatMessage` TypeScript interface with fields: `id` (string), `role` (`"user" | "assistant"`), `content` (string), and `timestamp` (number)
5. THE System SHALL export all type definitions from a `/types` directory so they are importable across the application

### Requirement 2: API Service Layer

**User Story:** As a frontend developer, I want a centralized API service layer, so that all backend communication is consistent, maintainable, and easily swappable.

#### Acceptance Criteria

1. THE API_Service SHALL expose a `getNews()` function that sends a GET request to `/api/news` and returns a `Promise<NewsItem[]>`
2. THE API_Service SHALL expose a `getBriefing(id: string)` function that sends a GET request to `/api/briefing/:id` and returns a `Promise<Briefing>`
3. THE API_Service SHALL expose a `sendMessage(message: string)` function that sends a POST request to `/api/chat` with the message payload and returns a `Promise<ChatMessage>`
4. WHEN an API call fails, THE API_Service SHALL throw a typed error containing the HTTP status code and a descriptive message
5. THE API_Service SHALL contain no hardcoded mock data or fallback data values
6. THE API_Service SHALL use a configurable base URL sourced from environment variables

### Requirement 3: Four-State Component Model

**User Story:** As a user, I want every data-driven component to handle all possible states, so that I always receive clear feedback regardless of network or data conditions.

#### Acceptance Criteria

1. WHEN data is being fetched, THE System SHALL display a Skeleton loading component in place of the real content
2. WHEN a fetch request fails, THE System SHALL display an error state with a descriptive message and a retry button
3. WHEN a fetch request succeeds but returns an empty collection, THE System SHALL display an empty state with a descriptive message
4. WHEN a fetch request succeeds with data, THE System SHALL display the populated content component
5. WHEN a user clicks the retry button in an error state, THE System SHALL re-initiate the failed fetch request

### Requirement 4: Layout System

**User Story:** As a user, I want a consistent application layout, so that I can navigate the application intuitively across all pages.

#### Acceptance Criteria

1. THE Layout SHALL render a fixed Sidebar on the left side of the viewport
2. THE Layout SHALL render a scrollable Feed area as the main content region
3. THE Layout SHALL render an optional Right Panel that can be shown or hidden based on the current page
4. WHILE the viewport width is below the tablet breakpoint, THE Layout SHALL collapse the Sidebar into a hidden or icon-only state
5. THE Layout SHALL apply consistently across all pages of the application

### Requirement 5: Feed Page

**User Story:** As a user, I want to browse a list of news items, so that I can stay informed about relevant topics.

#### Acceptance Criteria

1. WHEN the Feed_Page loads, THE System SHALL call `getNews()` and display a `FeedSkeleton` while the request is in flight
2. WHEN `getNews()` returns a non-empty array, THE System SHALL render a `NewsCard` for each `NewsItem` in the response
3. WHEN `getNews()` returns an empty array, THE System SHALL display the message "No news available" with a retry button
4. WHEN `getNews()` fails, THE System SHALL display the message "Failed to fetch data" with a retry button
5. THE NewsCard SHALL display the `title`, `summary`, `sentiment`, `impact`, and `category` fields of the `NewsItem`
6. WHEN a user clicks a `NewsCard`, THE System SHALL navigate to the `/briefing/:id` route for that item

### Requirement 6: Briefing Page

**User Story:** As a user, I want to read a detailed briefing for a news item, so that I can understand the full context and impact.

#### Acceptance Criteria

1. WHEN the Briefing_Page loads, THE System SHALL extract the `id` parameter from the route and call `getBriefing(id)`
2. WHEN `getBriefing(id)` is in flight, THE System SHALL display a `BriefingSkeleton`
3. WHEN `getBriefing(id)` returns data, THE System SHALL display the `title`, `summary`, `keyPoints` list, and `impactAnalysis` fields
4. WHEN `getBriefing(id)` fails, THE System SHALL display the message "Failed to fetch data" with a retry button
5. THE Briefing_Page SHALL be accessible at the dynamic route `/briefing/[id]`

### Requirement 7: Chat Component

**User Story:** As a user, I want to send messages and receive responses in a chat interface, so that I can ask questions about news and briefings.

#### Acceptance Criteria

1. THE Chat_Component SHALL render a scrollable list of chat bubbles, visually distinguishing user messages from assistant messages
2. THE Chat_Component SHALL render an input box and a send button for composing messages
3. WHEN a user submits a message, THE System SHALL call `sendMessage()` and display a typing animation while awaiting the response
4. WHEN `sendMessage()` returns a response, THE System SHALL append the assistant's `ChatMessage` to the chat bubble list
5. WHEN `sendMessage()` fails, THE System SHALL display an inline error message within the chat interface
6. WHEN the input field is empty, THE System SHALL disable the send button

### Requirement 8: Global State Management

**User Story:** As a developer, I want centralized global state, so that user profile data is accessible across all components without prop drilling.

#### Acceptance Criteria

1. THE Store SHALL hold a `userProfile` field of type `UserProfile | null`, initialized to `null`
2. THE Store SHALL expose a `setUser(profile: UserProfile)` action that updates the `userProfile` field
3. WHEN any component reads `userProfile` from the Store, THE System SHALL return the current value without requiring a page reload
4. THE Store SHALL be implemented using Zustand and persist across client-side navigation

### Requirement 9: Skeleton Loading Components

**User Story:** As a user, I want skeleton placeholders during loading, so that the layout feels stable and I understand content is on its way.

#### Acceptance Criteria

1. THE System SHALL provide a `FeedSkeleton` component that renders multiple placeholder cards matching the approximate shape of a `NewsCard`
2. THE System SHALL provide a `BriefingSkeleton` component that renders placeholder blocks matching the approximate shape of the Briefing_Page content
3. THE System SHALL provide a chat loading indicator (typing dots animation) displayed while `sendMessage()` is in flight
4. WHEN real content loads, THE System SHALL replace Skeleton components with the actual content without a full page refresh

### Requirement 10: UI Polish and Theming

**User Story:** As a user, I want smooth animations and dark mode support, so that the application feels polished and comfortable to use in any environment.

#### Acceptance Criteria

1. THE System SHALL support dark mode by applying Tailwind CSS dark mode classes, toggled via a system or user preference
2. WHEN page-level content transitions occur, THE System SHALL apply Framer Motion animations for smooth entry and exit
3. WHEN a `NewsCard` is hovered, THE System SHALL apply a subtle visual transition effect
4. THE System SHALL use ShadCN UI components as the base component library for all interactive elements
5. WHERE dark mode is active, THE System SHALL apply appropriate background, text, and border color tokens across all components
