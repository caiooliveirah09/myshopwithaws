"use client";
import DefaultButton from "@/components/atoms/buttons/defaultButton";
import H1 from "@/components/atoms/titles/h1";
import React from "react";

export default function Home() {
  const [products, setProducts] = React.useState();

  const getProducts = async () => {
    const products = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/products/"
    );
    const productsJson = await products.json();
    console.log(productsJson);
    setProducts(productsJson);
  };

  const addCart = async (productId: string) => {
    const id = productId.split("#")[1];
    const cart = localStorage.getItem("cart");
    if (!cart) {
      localStorage.setItem("cart", JSON.stringify([id]));
    } else {
      const cartArray = JSON.parse(cart);
      cartArray.push(id);
      localStorage.setItem("cart", JSON.stringify(cartArray));
    }
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="min-h-screen w-full">
      <nav className="fixed top-0 flex w-full left-0 border-b border-gray-700 justify-between h-12">
        <div className="px-8 flex items-center">
          <H1 text="MSA" align="center" />
        </div>
        <div>
          <button
            onClick={() => (window.location.href = "/cart")}
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

      <div className="w-full mt-12 p-2 gap-1 flex flex-col sm:flex-row sm:gap-2">
        {products &&
          products.Items.map((product: any, i) => {
            return (
              <div
                key={i}
                className="flex border border-gray-700 sm:w-36 h-fit sm:flex-col"
              >
                <img
                  src={product.src.S}
                  alt={product.name.S}
                  className="w-1/3 shadow-card sm:w-full h-36 object-contain"
                />
                <div className="px-2 flex flex-col justify-between text-white">
                  <div>
                    <h1 className="text-lg text-cyan-200">{product.name.S}</h1>
                    <p className="text-xl text-shadow-label">
                      ${product.price.S}
                    </p>
                  </div>
                  <p className="text-lg text-shadow-price ">
                    6x $
                    {(
                      parseFloat(
                        product.price.S.replace(/[^\d,]/g, "").replace(",", ".")
                      ) / 6
                    )
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                </div>
                <div className="m-auto">
                  <DefaultButton
                    text="BUY"
                    className="hover:text-shadow-price text-shadow-none bg-transparent hover:shadow-none px-8 hover:bg-transparent hover:text-white"
                    onClick={() => addCart(product["SK#"].S)}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
