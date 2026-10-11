'use client';

import { useEffect, useMemo, useState } from 'react';

type Player = {
  id: string;
  name: string;
  score: number;
};

type GameRecord = {
  id: string;
  startedAt: string;
  playersCount: number;
  winner: string;
  winnerScore: number;
  players: Array<{ name: string; score: number }>;
};

type Screen = 'home' | 'setup' | 'game' | 'stats';

const randomNames = [
  'Ava', 'Leo', 'Mila', 'Noah', 'Zoe', 'Eli', 'Ruby', 'Kai', 'Luna', 'Owen',
  'Ivy', 'Milo', 'Nia', 'Ezra', 'Tara', 'Jude', 'Sage', 'Finn', 'Mira', 'Theo',
  'Lena', 'Arlo', 'Iris', 'Jasper', 'Nova', 'Aiden', 'Pia', 'Rory', 'Vera', 'Dylan'
];

function generatePlayerNameList(count: number) {
  return Array.from({ length: count }, (_, index) => {
    const name = randomNames[(index + 1) % randomNames.length];
    return name;
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleString();
}

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>('home');
  const [playerCount, setPlayerCount] = useState(2);
  const [entryMode, setEntryMode] = useState<'random' | 'custom'>('random');
  const [customNames, setCustomNames] = useState<string[]>(Array.from({ length: 6 }, () => ''));
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [selectedScores, setSelectedScores] = useState<Record<string, number>>({});
  const [games, setGames] = useState<GameRecord[]>([]);
  const [selectedGame, setSelectedGame] = useState<GameRecord | null>(null);

  const playerGrid = useMemo(() => players, [players]);

  const loadGames = async () => {
    const response = await fetch('/api/games');
    const data = await response.json();
    setGames(data);
  };

  useEffect(() => {
    loadGames();
  }, []);

  const handleCustomNameChange = (index: number, value: string) => {
    const nextNames = [...customNames];
    nextNames[index] = value;
    setCustomNames(nextNames);
  };

  const startGameSetup = () => {
    setSelectedGame(null);
    setScreen('setup');
  };

  const startGame = () => {
    const names = entryMode === 'random'
      ? generatePlayerNameList(playerCount)
      : Array.from({ length: playerCount }, (_, index) => customNames[index]?.trim() || `Player ${index + 1}`);

    const nextPlayers = names.map((name, index) => ({
      id: `${name}-${index}-${Date.now()}`,
      name,
      score: 0,
    }));

    const initialScores = Object.fromEntries(nextPlayers.map((player) => [player.id, 0]));
    setPlayers(nextPlayers);
    setSelectedScores(initialScores);
    setSelectedPlayerId(nextPlayers[0]?.id || null);
    setScreen('game');
  };

  const updateSelectedScore = (playerId: string, score: number) => {
    setSelectedScores((current) => ({
      ...current,
      [playerId]: score,
    }));
  };

  const addScoreToPlayer = (playerId: string) => {
    const currentValue = Number(selectedScores[playerId] ?? 0);
    if (currentValue <= 0) return;

    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.id === playerId ? { ...player, score: player.score + currentValue } : player
      )
    );

    setSelectedScores((current) => ({
      ...current,
      [playerId]: 0,
    }));
  };

  const endGame = async () => {
    if (players.length === 0) return;

    const winner = [...players].sort((a, b) => b.score - a.score)[0];
    const game: GameRecord = {
      id: crypto.randomUUID(),
      startedAt: new Date().toISOString(),
      playersCount: players.length,
      winner: winner.name,
      winnerScore: winner.score,
      players: players.map((player) => ({
        name: player.name,
        score: player.score,
      })),
    };

    await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game),
    });

    await loadGames();
    setScreen('home');
    setPlayers([]);
    setSelectedPlayerId(null);
    setSelectedScores({});
    setSelectedGame(null);
  };

  return (
    <main className="page-shell">
      <div className="wrapper">
        {screen === 'home' && (
          <div className="home-panel">
            <div className="title-block">
              <p className="eyebrow">Qwirkle Score Tracker</p>
              <h1>Keep the game moving</h1>
            </div>

            <div className="button-stack">
              <button className="primary-btn" onClick={startGameSetup}>New game</button>
              <button className="secondary-btn" onClick={() => setScreen('stats')}>Statistics</button>
            </div>
          </div>
        )}

        {screen === 'setup' && (
          <div className="setup-panel">
            <h2>Game setup</h2>

            <div className="field-group">
              <label htmlFor="playerCount">How many players are there?</label>
              <input
                id="playerCount"
                type="number"
                min={2}
                max={10}
                value={playerCount}
                onChange={(event) => setPlayerCount(Number(event.target.value) || 2)}
              />
            </div>

            <div className="field-group">
              <p>Would you like to enter names or generate random names?</p>
              <div className="choice-row">
                <label>
                  <input
                    type="radio"
                    checked={entryMode === 'random'}
                    onChange={() => setEntryMode('random')}
                  />
                  Generate names
                </label>

                <label>
                  <input
                    type="radio"
                    checked={entryMode === 'custom'}
                    onChange={() => setEntryMode('custom')}
                  />
                  Enter names
                </label>
              </div>
            </div>

            {entryMode === 'custom' && (
              <div className="names-grid">
                {Array.from({ length: playerCount }, (_, index) => (
                  <div key={index} className="field-group small-field">
                    <label htmlFor={`player-${index}`}>Player {index + 1}</label>
                    <input
                      id={`player-${index}`}
                      type="text"
                      value={customNames[index] || ''}
                      onChange={(event) => handleCustomNameChange(index, event.target.value)}
                      placeholder={`Player ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="button-row">
              <button className="secondary-btn" onClick={() => setScreen('home')}>Back</button>
              <button className="primary-btn" onClick={startGame}>Continue</button>
            </div>
          </div>
        )}

        {screen === 'game' && (
          <div className="game-panel">
            <div className="game-header">
              <h2>Scoreboard</h2>
              <button className="warning-btn" onClick={endGame}>End of game</button>
            </div>

            <div className="player-grid">
              {playerGrid.map((player) => {
                const isSelected = selectedPlayerId === player.id;
                const scoreValue = Number(selectedScores[player.id] ?? 0);

                return (
                  <div
                    key={player.id}
                    className={`player-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedPlayerId(player.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        setSelectedPlayerId(player.id);
                      }
                    }}
                  >
                    <div className="card-header">
                      <h3>{player.name}</h3>
                      <span className="score-badge">{player.score}</span>
                    </div>

                    <label className="score-field">
                      <span>Score</span>
                      <select
                        value={scoreValue}
                        onChange={(event) => updateSelectedScore(player.id, Number(event.target.value))}
                        onClick={(event) => event.stopPropagation()}
                      >
                        {Array.from({ length: 21 }, (_, index) => (
                          <option key={index} value={index}>
                            {index}
                          </option>
                        ))}
                      </select>
                    </label>

                    <button
                      className="primary-btn small-btn"
                      disabled={scoreValue === 0}
                      onClick={(event) => {
                        event.stopPropagation();
                        addScoreToPlayer(player.id);
                      }}
                    >
                      Add scores
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {screen === 'stats' && (
          <div className="stats-panel">
            <div className="stats-header">
              <h2>Game statistics</h2>
              <button className="secondary-btn" onClick={() => setScreen('home')}>Back</button>
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Winner</th>
                    <th>Winner score</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr key={game.id} onClick={() => setSelectedGame(game)} className="table-row">
                      <td>{game.id.slice(0, 8)}</td>
                      <td>{game.winner}</td>
                      <td>{game.winnerScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedGame && (
              <div className="modal-backdrop" onClick={() => setSelectedGame(null)}>
                <div className="modal" onClick={(event) => event.stopPropagation()}>
                  <div className="modal-header">
                    <h3>Game {selectedGame.id.slice(0, 8)}</h3>
                    <button className="secondary-btn small-btn" onClick={() => setSelectedGame(null)}>Close</button>
                  </div>

                  <p className="modal-meta">Started: {formatDate(selectedGame.startedAt)}</p>

                  <ul className="player-list">
                    {selectedGame.players.map((player) => {
                      const isWinner = player.name === selectedGame.winner;
                      return (
                        <li key={`${selectedGame.id}-${player.name}`} className={isWinner ? 'winner-entry' : ''}>
                          <span>{player.name}</span>
                          <strong>{player.score}</strong>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
