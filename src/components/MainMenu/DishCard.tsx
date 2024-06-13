import { Dish } from "@/interfaces/IDishDaily";
import { IonIcon, useIonRouter } from "@ionic/react";
import { chevronForwardCircleOutline, sunny } from "ionicons/icons";

function DishCard({ id, name, nation, type }: Dish) {
  const route = useIonRouter();
  return (
    <div className="mt-3 bg-white rounded p-4 shadow flex flex-row">
      <img className="rounded" src="https://placehold.co/90" alt="" />
      <div className="ml-4 w-full">
        <div className="text-[#F4C478] flex flex-row items-center font-bold">
          <p className="mr-1">{type}</p>
          <div className="w-full text-xl">
            <div className="flex flex-row items-center">
              <IonIcon icon={sunny} />
            </div>
          </div>
          <p>{nation}</p>
        </div>
        <div className="mt-4 font-semibold flex flex-row items-center">
          <p className="w-full">{name}</p>
          <div
            className="text-3xl flex flex-row items-center"
            onClick={() => {
              route.push(`/recipe/detail/${id}`);
            }}
          >
            <IonIcon icon={chevronForwardCircleOutline} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishCard;
