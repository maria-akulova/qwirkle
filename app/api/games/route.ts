html, body {
  margin: 0;
  min-height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  color: #1d2d1d;
}

* {
  box-sizing: border-box;
}

body {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
    url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80');
  background-size: cover;
  background-position: center;
}

button,
input,
select {
  font: inherit;
}

button {
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.wrapper {
  width: min(80vw, 1100px);
  min-height: 80vh;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 28px;
  box-shadow: 0 24px 60px rgba(18, 42, 24, 0.2);
  padding: 32px;
  display: flex;
  flex-direction: column;
}

.home-panel,
.setup-panel,
.game-panel,
.stats-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.home-panel {
  align-items: center;
  justify-content: center;
  flex: 1;
}

.title-block {
  text-align: center;
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #4a7d4b;
  font-weight: 700;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  font-size: clamp(2.4rem, 4vw, 4rem);
}

h2 {
  font-size: clamp(1.8rem, 2vw, 2.5rem);
}

.button-stack,
.button-row,
.choice-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.button-stack {
  justify-content: center;
}

.primary-btn,
.secondary-btn,
.warning-btn {
  border-radius: 14px;
  min-height: 52px;
  padding: 0 26px;
  font-weight: 700;
  box-shadow: 0 10px 18px rgba(52, 106, 60, 0.18);
}

.primary-btn {
  background: linear-gradient(135deg, #3b8f4d, #67aa67);
  color: white;
}

.secondary-btn {
  background: #edf5ee;
  color: #224b2a;
}

.warning-btn {
  background: linear-gradient(135deg, #d66650, #c03d2d);
  color: white;
}

.primary-btn:hover,
.secondary-btn:hover,
.warning-btn:hover {
  transform: translateY(-1px);
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.field-group label,
.field-group p {
  font-weight: 600;
}

input,
select {
  border: 1px solid #c7d7c7;
  border-radius: 12px;
  padding: 12px 14px;
  background: #fff;
  color: #153421;
}

.names-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.small-field {
  min-width: 0;
}

.game-header,
.stats-header,
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.player-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.player-card {
  border: 2px solid #d5ebd5;
  background: linear-gradient(180deg, #f7faf7 0%, #edf6ee 100%);
  border-radius: 18px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 220px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.player-card.selected {
  border-color: #3d9a4d;
  box-shadow: 0 18px 30px rgba(61, 154, 77, 0.18);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.score-badge {
  background: #dff4e5;
  color: #1f5d2e;
  font-weight: 700;
  border-radius: 999px;
  min-width: 48px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.score-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;
}

.small-btn {
  min-height: 44px;
  padding: 0 18px;
  width: 100%;
}

.table-wrapper {
  overflow-x: auto;
  border: 1px solid #d7e7d7;
  border-radius: 18px;
  background: #f8faf8;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 14px 16px;
  border-bottom: 1px solid #e6efe6;
  text-align: left;
}

th {
  background: #ebf5eb;
  color: #264f2d;
}

.table-row {
  cursor: pointer;
}

.table-row:hover {
  background: #edf8ef;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(16, 23, 17, 0.52);
  display: grid;
  place-items: center;
  padding: 24px;
}

.modal {
  width: min(500px, 100%);
  background: #fff;
  border-radius: 20px;
  padding: 22px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.modal-meta {
  margin: 8px 0 16px;
  color: #537458;
}

.player-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.player-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  padding: 12px 16px;
  background: #f3f7f3;
}

.winner-entry {
  background: #dff5e4 !important;
  border: 1px solid #72bf82;
}

@media (max-width: 760px) {
  .wrapper {
    width: min(92vw, 1100px);
    padding: 20px;
  }

  .game-header,
  .stats-header,
  .modal-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
