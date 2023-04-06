
import { useEffect } from 'react';
import './App.css';
import { getAllPokemon } from './utils/pokemon';

function App() {

  // エンドポイント
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  // ブラウザをリロードしたらポケモンを取得したいのでuseEffect
  useEffect(() => {
    // 非同期処理を行いたい場合はasync関数を使うとよい
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      console.log(res);
    }

    fetchPokemonData();

  }, []);

  return (
    <div className="App">
      test
    </div>
  );
}

export default App;
