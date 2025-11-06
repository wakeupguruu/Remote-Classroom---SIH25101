## Project To-dos

Keep this file as the single source of truth for implementation progress. Check items when complete and add links/PRs next to them.

### Authentication & Roles
- [ ] Set up NextAuth with Google and credentials using Firestore adapter (id: auth-nextauth-firestore)
- [ ] Define user roles (lecturer, student) and access control middleware (id: auth-roles-middleware)

### Data Model & Storage
- [ ] Design Firestore schema for users, meetings, schedules, participants, materials (id: db-schema-firestore-meetings)
- [ ] Implement materials upload using Firebase Storage and list per meeting (id: materials-upload-storage)

### Meetings & Scheduling
- [ ] Build lecturer UI to create meetings with recurrence and access code (id: ui-meeting-create)
- [ ] Implement join-by-link or code flow for students (id: ui-join-flow)
- [ ] Add calendar views for lecturer and student with schedules (id: ui-calendar-views)
- [ ] Add scheduling notifications and reminders via email (id: notifications-email-scheduling)

### Live Sessions
- [ ] Integrate broadcast mode via Livepeer with chat and moderation toggle (id: live-broadcast-livepeer-chat)
- [ ] Integrate interactive mode via LiveKit SFU with controls (id: live-interactive-livekit-controls)
- [ ] Add permissions controls UI for mic, camera, screen, docs sharing (id: ui-permissions-controls)
- [ ] Implement adaptive bitrate and audio-only fallback with network detection (id: network-abr-audio-fallback)
- [ ] Implement recording pipeline and upload to storage after session (id: recording-upload-pipeline)

### Notes Generation (ASR + LLM + PDFs)
- [ ] Generate ASR transcript with timestamps using Whisper (local or API) (id: asr-whisper-transcript)
- [ ] Create LLM endpoint to structure notes JSON from transcript (id: llm-structure-notes-endpoint)
- [ ] Create translation service to multiple languages via Anthropic/OpenRouter (id: llm-translate-service)
- [ ] Render multilingual notes JSON to PDF and store per language (id: render-pdf-multilingual)
- [ ] Build post-session page for recording, materials, and notes download (id: ui-post-session-assets)

### Analytics & Ops
- [ ] Add attendance and session analytics collection (id: analytics-attendance-session)
- [ ] Set up env config, feature flags, and provider fallbacks (id: ops-env-feature-flags)

---

Notes:
- Default branch: main. Replace with master if applicable.
- Providers: Anthropic/OpenRouter for LLM; Whisper (local/API) for ASR; Livepeer (broadcast); LiveKit (interactive); Firebase (Auth/Firestore/Storage).
- Low bandwidth: ensure audio-only fallback, ABR, and deferred material downloads.


