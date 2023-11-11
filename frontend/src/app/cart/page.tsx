"use client";

import DefaultButton from "@/components/atoms/buttons/defaultButton";
import Text from "@/components/atoms/text/text";
import H1 from "@/components/atoms/titles/h1";
import H2 from "@/components/atoms/titles/h2";
import H3 from "@/components/atoms/titles/h3";
import React from "react";
import { useSession } from "../session";
import { spawn } from "child_process";

export default function Cart() {
  const [cartProducts, setCartProducts] = React.useState();
  const [orders, setOrders] = React.useState();
  const { userAuthenticated } = useSession();

  const getCartProducts = async () => {
    const sks = JSON.parse(localStorage.getItem("cart") || "[]");
    if (sks.length === 0) {
      setCartProducts([]);
      return;
    }
    const products = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "products?sks=" +
        sks.join(",")
    );
    const productsJson = await products.json();
    setCartProducts(productsJson);
  };

  const buyItems = async () => {
    const email = userAuthenticated.idToken.payload.email;
    const products = cartProducts.map((item: any) => {
      const product = item.Items[0];
      return {
        sk: product["SK#"].S,
        name: product.name.S,
        price: product.price.S,
        description: product.description.S,
        src: product.src.S,
      };
    });
    const body = {
      email,
      products,
    };
    await fetch(
      process.env.NEXT_PUBLIC_API_URL + "orders",
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    localStorage.setItem("cart", JSON.stringify([]));
    await getCartProducts();
    await getOrders();
  };

  const getOrders = async () => {
    const email = userAuthenticated.idToken.payload.email;

    const getOrders = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "orders?email=" +
        email
    );
    const getOrdersJson = await getOrders.json();
    setOrders(getOrdersJson);
  };

  React.useEffect(() => {
    getCartProducts();
    getOrders();
  }, []);

  return (
    <main className="min-h-screen w-full">
      <nav className="fixed top-0 flex w-full left-0 border-b border-gray-700 justify-between h-12 bg-gray-900">
        <div className="px-8 flex items-center">
          <H1 text="MSA" align="center" />
        </div>
        <div>
          <button
            onClick={() => localStorage.clear()}
            className="text-cyan-200 border-x border-gray-700 px-4 hover:text-teal-800 hover:text-shadow-none transition-all h-full text-shadow-price"
          >
            cart
          </button>
          <button
            onClick={() => localStorage.clear()}
            className="text-shadow-button text-cyan-200 border-x border-gray-700 px-4 hover:text-teal-800 hover:text-shadow-none transition-all h-full"
          >
            logout
          </button>
        </div>
      </nav>

      <div className="w-full mt-12 p-2 gap-1 flex flex-col sm:gap-2">
        {!cartProducts || cartProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <H2 text="Your cart is empty" align="center" />
          </div>
        )}
        {cartProducts && cartProducts.length > 0 && (
          <div className="border-gray-700 border px-2 py-2">
            <H3 text="Cart items" align="left" className="text-shadow-price" />
            <div className="flex justify-between flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-1">
                {cartProducts.map((item: any, i: number) => {
                  const product = item.Items[0];
                  return (
                    <div
                      key={i}
                      className="flex justify-between border border-gray-700 rounded-md p-2 w-full sm:max-w-xs"
                    >
                      <div className="flex flex-col justify-between">
                        <Text>{`1x ${product.name.S}`}</Text>
                        <Text>{`$ ${product.price.S}`}</Text>
                      </div>
                      <div>
                        <DefaultButton
                          className="hover:text-shadow-danger text-shadow-none bg-transparent hover:shadow-none px-8 hover:bg-transparent hover:text-white"
                          text="X"
                          onClick={() => {
                            const sks = JSON.parse(
                              localStorage.getItem("cart") || "[]"
                            );
                            const index = sks.indexOf(
                              product["SK#"].S.split("#")[1]
                            );
                            if (index > -1) {
                              sks.splice(index, 1);
                            }
                            localStorage.setItem("cart", JSON.stringify(sks));
                            getCartProducts();
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="border-gray-700 border h-fit flex flex-col gap-2">
                <Text className="text-shadow-label border-b px-6">{`Total ${cartProducts.length} items`}</Text>
                <Text className="flex text-shadow-label border-b px-6">
                  {`Total: $ ${
                    cartProducts
                      ? cartProducts.reduce((acc: number, item: any) => {
                          const product = item.Items[0];
                          return (
                            acc +
                            parseFloat(
                              product.price.S.replace(/[^\d,]/g, "").replace(
                                ",",
                                "."
                              )
                            )
                          );
                        }, 0).toFixed(2)
                        .replace(".", ",")
                      : 0
                  }`}
                </Text>

                <div className="py-1 sm:max-w-xs w-full">
                  <DefaultButton
                    className="hover:text-shadow-price shadow-input text-shadow-none bg-green-700 hover:shadow-none px-8  hover:text-white"
                    paddingOutside={false}
                    text="Buy"
                    onClick={buyItems}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <H3 text="Old orders" align="left" className="text-shadow-label pt-4" />

        {orders &&
          Object.entries(orders).map(([orderKey, items], index) => (
            <div key={index} className="border-gray-700 border px-2 py-2">
            <H3 text={`Order - ${orderKey}`} align="left" className="text-shadow-label"/>
            <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              {items.map((product: any, i: number) => {
                return (
                  <div
                    key={i}
                    className="flex justify-between border border-gray-700 rounded-md p-2 w-full sm:max-w-xs"
                  >
                    <div className="flex flex-col justify-between">
                      <Text>{`1x ${product.name.S}`}</Text>
                      <Text>{`$ ${product.price.S}`}</Text>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-gray-700 border h-fit flex flex-col gap-2">
                <Text className="text-shadow-label border-b px-6">{`Total ${items.length} items`}</Text>
                <Text className="flex text-shadow-label border-b px-6">
                  {`Total: $ ${
                    items
                      ? items.reduce((acc: number, product: any) => {
                          return (
                            acc +
                            parseFloat(
                              product.price.S.replace(/[^\d,]/g, "").replace(
                                ",",
                                "."
                              )
                            )
                          );
                        }, 0).toFixed(2)
                        .replace(".", ",")
                      : 0
                  }`}
                </Text>
              </div>
            </div>
            </div>
          ))}
      </div>
    </main>
  );
}
