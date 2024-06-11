import DishCard from "@/components/MainMenu/DishCard";
import { Dish } from "@/interfaces/IDishDaily";
import { Axios } from "@/plugins/Axios";
import {
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  IonSpinner,
} from "@ionic/react";
import { caretDownOutline, caretForwardOutline, search } from "ionicons/icons";
import { useEffect, useState } from "react";

const Tab2: React.FC = () => {
  const [dish, setDish] = useState<Dish[] | null>();
  const [filteredDish, setFilteredDish] = useState<Dish[] | null>();
  const [filterValue, setFilterValue] = useState<{
    nation: string[];
    type: string[];
  }>({
    nation: [],
    type: [],
  });
  const [filterParamter, setFilterParameter] = useState<{
    nation: string | null;
    type: string | null;
    name: string | null;
  }>({
    nation: "",
    type: "",
    name: "",
  });
  const [expandList, setExpandList] = useState<{
    [key: string]: boolean;
  }>({});
  useEffect(() => {
    if (dish == null) {
      Axios.get("/dish/").then((res) => {
        const result: Dish[] = res.data;
        const nation = Array.from(
          new Set(result.map((item) => item.nation))
        ).sort();
        const type = Array.from(
          new Set(result.map((item) => item.type))
        ).sort();
        setFilterParameter({
          nation: "",
          name: "",
          type: type[0],
        });
        setFilterValue({
          nation: nation,
          type: type,
        });
        if (filterParamter.nation !== "" && filterParamter.type !== "") {
          const filtered = result.filter(
            (item) =>
              item.nation === filterParamter.nation &&
              item.type === filterParamter.type
          );
          setFilteredDish(filtered);
        } else if (filterParamter.nation !== "") {
          const filtered = result.filter(
            (item) => item.nation === filterParamter.nation
          );
          setFilteredDish(filtered);
        } else if (filterParamter.type !== "") {
          const filtered = result.filter(
            (item) => item.type === filterParamter.type
          );
          setFilteredDish(filtered);
        } else {
          setFilteredDish(result);
        }
        setDish(result);
      });
    }
  }, []);
  useEffect(() => {
    if (dish) {
      const filtered = dish.filter((item) => {
        if (filterParamter.nation !== "" && filterParamter.type !== "") {
          return (
            item.nation === filterParamter.nation &&
            item.type === filterParamter.type &&
            item.name.includes(filterParamter.name || "")
          );
        } else if (filterParamter.nation !== "") {
          return (
            item.nation === filterParamter.nation &&
            item.name.includes(filterParamter.name || "")
          );
        } else if (filterParamter.type !== "") {
          return (
            item.type === filterParamter.type &&
            item.name.includes(filterParamter.name || "")
          );
        }
        return true;
      });
      setFilteredDish(filtered);
    }
  }, [filterParamter]);
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="ion-padding">
          <div className="w-full">
            <IonInput
              fill="outline"
              onIonInput={(e) => {
                setFilterParameter({
                  ...filterParamter,
                  name: e.detail.value || "",
                });
              }}
              className="[--background:#fff] [--color:#000] [--placeholder-color:#b3b4ba] [--placeholder-opacity:1] [--padding-bottom:10px] [--padding-end:10px] [--padding-start:10px] [--padding-top:10px] font-bold"
            >
              <IonIcon slot="start" icon={search} aria-hidden="true"></IonIcon>
            </IonInput>
          </div>
          <div className="mt-3">
            {dish == null && (
              <div className="flex flex-row items-center justify-center w-full">
                <IonSpinner name="dots" />
              </div>
            )}
            {dish && (
              <div className="flex flex-row items-center w-full">
                {filterValue.type.map((value) => {
                  return (
                    <div
                      className={`${
                        value == filterParamter.type
                          ? "bg-[#F3B660] text-white"
                          : "bg-white text-[#774C2A]"
                      } w-full text-xl font-semibold rounded-full text-center p-2 mx-1`}
                      key={value}
                      onClick={() => {
                        setFilterParameter({
                          ...filterParamter,
                          type: value,
                        });
                      }}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            {dish == null && (
              <div className="flex flex-row items-center justify-center w-full">
                <IonSpinner name="dots" />
              </div>
            )}
            {dish && (
              <div className="flex flex-col w-full">
                {filterValue.nation.map((valueFilter) => {
                  if (
                    filteredDish?.filter(
                      (value) => value.nation === valueFilter
                    ).length === 0
                  ) {
                    return null;
                  }
                  return (
                    <div className="mt-3" key={valueFilter}>
                      <p
                        className="text-2xl font-semibold"
                        onClick={() => {
                          setExpandList({
                            ...expandList,
                            [valueFilter]: !expandList[valueFilter],
                          });
                        }}
                      >
                        Masakan{" "}
                        <span className="text-[#F3B660]">
                          {valueFilter}{" "}
                          <IonIcon
                            className="text-sm"
                            icon={expandList[valueFilter] ? caretForwardOutline : caretDownOutline}
                          />
                        </span>
                      </p>
                      {filteredDish?.map((value) => {
                        if (expandList[valueFilter]) {
                          return null;
                        }
                        if (value.nation !== valueFilter) {
                          return null;
                        }
                        return (
                          <DishCard
                            key={value.id}
                            id={value.id}
                            name={value.name}
                            nation={value.nation}
                            groceries={value.groceries}
                            type={value.type}
                            recipe={value.recipe}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
