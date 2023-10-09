import React, { useEffect, useState } from 'react';
import './App.css';
import Game from './components/game/game';
import useSceneManager from './components/game/hooks/useSceneManager';
import { SceneManager } from './components/game/classes/SceneManager';
import Header from './components/header/header';



function App() {
  const [SceneManage, setSceneManager] = useState<SceneManager | null>(null)
  const SceneManagerPromise = useSceneManager({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded && SceneManagerPromise !== null) {
      const getScene = async () => await SceneManagerPromise;

      const setupScene = async () => {
        const manage = await getScene();
        if (manage) {
          setSceneManager(manage);
          setLoaded(true);
        }
      };
      setupScene();
    }
    return () => {
      // cleanup function
    }
  }, [SceneManagerPromise, loaded])
  return (
    <div className="App">
      <header className="App-header">
        {SceneManage ? <Game SceneManager={SceneManage} /> : <Header />}
      </header>
    </div>
  );
}

export default App;