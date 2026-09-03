# MediKiosk UI prototype

Interactive React/Vite prototype for the complete clinical-intake loop: kiosk, patient mobile upload, AI interview and sensory check, triage, clinician EMR, dispensary queue, and the post-consultation prescription view.

## Run

```bash
pnpm install
pnpm dev
```

In a second terminal, start the API with `pnpm server`. The sign-in screen includes a **Use demo ID** action for each role. The persistent demo credentials are visible on the selected role's card (all use `Demo@123`).

Open the on-screen navigation rail to explore every interface. The prototype uses local optimistic updates/toasts in place of a live Socket.IO server, but `socket.io-client` is included for wiring to the backend.

## Notable interactions

- Kiosk flow with English/regional-language entry, consent audio feedback, QR bridge, conversation chips and sensory assessment.
- Emergency and standard triage states.
- EMR handoff with editable clinical note and prescription routing action.
- Pharmacy Kanban actions with immediate feedback.
- Mobile medication alarms export through `src/ics.js`, which produces a recurring iCalendar (`.ics`) download.

The Kiosk viewport disables user-select and includes a maximum-scale viewport setting to reduce accidental touchscreen interactions.
