## 1. Run Frontend and Backend
### Backend (.NET 8 API)
```bash
cd backend
dotnet restore
dotnet run
```
Backend runs on http://localhost:5297 (and https://localhost:7278 in the https profile).

### Frontend (Vite + React)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on Vite’s local dev URL (typically http://localhost:5173).
**Run both in *separate terminals* so the frontend can call the backend API.**