# Specification

## Summary
**Goal:** Emphasize Navera’s name in the main Valentine question and update the “Yes” modal to use a more romantic, caring image.

**Planned changes:**
- Update the main question headline in `frontend/src/App.tsx` to include the name “Navera” and apply a clear romantic highlight effect only to the word “Navera” (e.g., soft glow plus subtle underline/marker style) while keeping the existing responsive layout and styling.
- Replace the “Yes / Good Choice” modal image asset reference in `frontend/src/App.tsx` with a newly added romantic/caring static image stored under `frontend/public/assets/generated/`, preserving the existing modal image sizing (`object-contain`), rounded corners, and shadow.

**User-visible outcome:** The main question visibly highlights “Navera” without affecting readability or responsiveness, and the “Yes” modal displays a more romantic, caring image with the same layout and styling as before.
