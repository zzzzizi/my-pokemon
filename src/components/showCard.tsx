import { Pokemon } from '../features/fetchDataSlice';
import './showCard.css';

export const ShowCard = ({
  pokemonData,
  playerCardContainer,
  playerCard,
  showCardStyle,
}: {
  playerCard?: string;
  playerCardContainer?: string;
  showCardStyle?: string;
  pokemonData: Pokemon;
}) => {
  const pokemonImg = pokemonData.sprites?.front_default;
  const pokemonName = pokemonData.name;
  const pokemonWeight = pokemonData.weight;
  const pokemonHeight = pokemonData.height;
  const pokemonStats = pokemonData.stats;
  const pokemonAbilities = pokemonData.abilities;
  const pokemonType = pokemonData.types;
  return (
    <div className={`${showCardStyle}card__container`}>
      <div className={`${showCardStyle}card`}>
        <div className={`${showCardStyle}card__top`}>
          <div className={`${showCardStyle}card__name`}>{pokemonName}</div>
        </div>

        <div className={`${showCardStyle}card__middle`}>
          <img
            src={pokemonImg}
            alt="pokemonpicture"
            className={`${showCardStyle}card__middle__img`}
          />
          <div className={`${showCardStyle}card__middle__attributes`}>
            <div className={`${showCardStyle}card__middle__attribute`}>
              <p>Height:</p>
              <div>{pokemonHeight}</div>
            </div>
            <div className={`${showCardStyle}card__middle__attribute`}>
              <p>Weight:</p>
              <div>{pokemonWeight}</div>
            </div>
            <div className={`${showCardStyle}card__middle__attribute`}>
              <p>Abilities:</p>
              <div>
                {pokemonAbilities?.map((ability, index) => (
                  <div key={index}>{ability.ability.name}</div>
                ))}
              </div>
            </div>
            <div className={`${showCardStyle}card__middle__attribute`}>
              <p>Type:</p>
              <div>
                {pokemonType?.map((type, index) => (
                  <div key={index}>{type.type.name}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`${showCardStyle}card__bottom`}>
          <div>
            <p>HP :</p>
            <div>{(pokemonStats ?? [])[0]?.base_stat}</div>
          </div>
          <div>
            <p>Attack :</p>
            <div>{(pokemonStats ?? [])[1]?.base_stat}</div>
          </div>
          <div>
            <p>Defense :</p>
            <div>{(pokemonStats ?? [])[2]?.base_stat}</div>
          </div>
          <div>
            <p>special-attack :</p>
            <div>{(pokemonStats ?? [])[3]?.base_stat}</div>
          </div>
          <div>
            <p>special-defense :</p>
            <div>{(pokemonStats ?? [])[4]?.base_stat}</div>
          </div>
          <div>
            <p>speed :</p>
            <div>{(pokemonStats ?? [])[5]?.base_stat}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
