
import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';

function App() {

  // エンドポイント
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  //11.useStateを使ってloadingのbooleanをtrueにしておく。
  const [loading, setLoading] = useState(true);

  // ブラウザをリロードしたらポケモンを取得したいのでuseEffect
  useEffect(() => {
    // 非同期処理を行いたい場合はasync関数を使うとよい
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);

      // 12.各ポケモンの詳細データを取得
      loadPokemon(res.results);

      //11.ポケモンデータが取得できたらloadingのstateをfalseに切り替える
      setLoading(false);
    }

    fetchPokemonData();
  }, []);

  // 各ポケモンの詳細データが必要なのでjsonデータをもっと細かく分けるための関数
  const loadPokemon = (data) => {
    let _pokemonData = Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );

  }

  return (
    <div className="App">

      {/* もしsetLoadingの値がtrueなら『ロード中・・・』falseなら『ポケモンデータを取得しました。』と表示させる。 */}
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <>
          <h1>ポケモンデータを取得しました。</h1>
        </>
      )
      }
    </div>
  );
}

export default App;
