import RecipeList from "@/components/Recipe/RecipeList";
import { Dish } from "@/interfaces/IDishDaily";
import Http from "@/plugins/Http";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [dish, setDish] = useState<Dish | null>();
  useEffect(() => {
    new Http(`/dish/${id}`).request().then((res) => {
      const result: Dish = res.data;
      setDish(result);
    });
  }, []);
  return (
    <IonPage>
      <IonContent className="ion-padding">
        {dish == null && (
          <div className="flex flex-row items-center justify-center w-full">
            <IonSpinner name="dots" />
          </div>
        )}
        {dish && (
          <div>
            <p className="text-xl font-semibold">{dish.name}</p>
            <div className="mt-3">
              <RecipeList
                title="Bahan-Bahan"
                items={dish.groceries
                  .split(",")
                  .map((item) => item.trim())
                  .map((item) => ({ name: item }))}
              />
            </div>
            <div className="mt-3">
              <RecipeList
                title="Langkah-Langkah"
                items={dish.recipe
                  .split(/\d+\.\s*/)
                  .filter((step) => step.trim() !== "")
                  .map((item) => ({ name: item }))}
              />
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default RecipeDetail;
