export const AdventurerTutorial = () => {
  return (
    <div className="flex flex-col">
      <h1 className="mt-0">Welcome to Loot Survivor</h1>
      <h3 className="text-xl sm:text-2xl">Create an Adventurer</h3>
      <p className="text-sm sm:text-lg">
        Welcome to the thrilling world of Loot Survivor. To kickstart your epic
        adventure, you will first need to create your very own Adventurer. Think
        of it as stepping into a pair of sturdy boots that will carry you across
        the vast expanses of our game world until the very end.
      </p>
      <br />
      <p className="text-sm sm:text-lg">
        To bring your Adventurer to life, you&apos;ll need to provide some
        unique information:
      </p>
      <br />
      <ul>
        <li>
          <span className="text-xl">Name</span> - A worthy name for a lordly
          adventurer. Max of 16 characters.
        </li>
        <li>
          <span className="text-xl">Home Realm</span> - An id of a realm from
          where your adventurer was born.
        </li>
        <li>
          <span className="text-xl">Race</span> - What race shall your
          adventurer be?
        </li>
        <li>
          <span className="text-xl">Starting Weapon</span> - There are 4 choices
          of starter weapon. Choose wisely!
        </li>
      </ul>
      <br />
      <p className="text-sm sm:text-lg">
        Minting will cost only 5 $LORDS that will follow a scheduled
        distribution pattern to players and the DAO. After 8 weeks, a new front
        end provider will be able to be paid for attracting new players to the
        game.
      </p>
      <br />
      <p className="text-sm sm:text-lg">
        Once your Adventurer is minted, a world of opportunities opens up.
        You&apos;ll be able to perform a range of actions to help them climb the
        ranks and achieve the glory they deserve.
      </p>
      <p className="text-sm sm:text-lg mb-1">Are you ready to survive?</p>
    </div>
  );
};