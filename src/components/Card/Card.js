import React from 'react'
import './Card.css';

// カード形式で表示させるためCard.jsでコンポーネントを作成
// {}で囲むことによってpokemonの配列のみ取得することができる。
const Card = ({ pokemon }) => {

    return (
        <div className='card'>
            <div className='card-Img'>
                {/* 画像出力 */}
                <img src={pokemon.sprites.front_default} alt='' />
            </div>
            <h3 className='cardName'>{pokemon.name}</h3>
            <div className="cardType">
                <div>タイプ</div>
                {/* タイプは複数あるポケモンもいるのでmap関数で回して持っているタイプ分取得する。 */}
                {pokemon.types.map((type) => {
                    return (
                        <div key={type.type.name}>
                            <span className="typeName">{type.type.name}</span>
                        </div>
                    );
                })}
            </div>
            <div className="cardInfo">
                <div className="cardData">
                    <p className="title">重さ : {pokemon.weight}</p>
                </div>
                <div className="cardData">
                    <p className="title">高さ : {pokemon.height}</p>
                </div>
                <div className="cardData">
                    <p className="title">アビリティ : {pokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </div>
    )
}

export default Card