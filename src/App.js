
import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { getAllPokemon, getPokemon } from './utils/pokemon';

function App() {

  // エンドポイント
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  //11.useStateを使ってloadingのbooleanをtrueにしておく。
  const [loading, setLoading] = useState(true);
  // _pokemonDataをスコープ外でも使いたいためuseStateで管理する。
  const [pokemonData, setPokemonData] = useState([]);

  // ブラウザをリロードしたらポケモンを取得したいのでuseEffect
  useEffect(() => {
    // 非同期処理を行いたい場合はasync/await関数を使うこと
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

  //13.各ポケモンの詳細データが必要なのでjsonデータをもっと細かく分けるための関数
  const loadPokemon = async (data) => {
    // async/awaitとは非同期処理の構文のこと https://qiita.com/soarflat/items/1a9613e023200bbebcb3
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // pokemon.urlでポケモンの詳細を渡している
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    // useState呼び出して_pokemonDataを格納する。
    setPokemonData(_pokemonData);
  }

  // useStateを使っているので_pokemonDataがpokemonDataとして出力される。
  // console.log(pokemonData);

  return (
    <div className="App">

      {/* もしsetLoadingの値がtrueなら『ロード中・・・』falseなら『ポケモンデータを取得しました。』と表示させる。 */}
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <>
          <div className='pokemonCardContainer'>
            {/* ポケモン詳細データをmap関数で回してCard.jsに値を渡す iはindexのi */}
            {pokemonData.map((pokemon, i) => {
              // console.log(pokemon);
              return <Card pokemon={pokemon} key={i} />
            })}
          </div>
        </>
      )
      }
    </div>
  );
}

export default App;
