"use client";
import H1 from "@/components/atoms/titles/h1";
import React from "react";

export default function Home() {
  const [products, setProducts] = React.useState();

  const getProducts = async () => {
    const products = await fetch(
      "https://uo7b4glzaaf2446buyvkalmdg40mdrml.lambda-url.sa-east-1.on.aws/"
    );
    const productsJson = await products.json();
    console.log(productsJson);
    setProducts(productsJson);
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
        <button
          onClick={() => localStorage.clear()}
          className="text-shadow-button text-cyan-200 border-x border-gray-700 px-4 hover:text-teal-800 hover:text-shadow-none transition-all"
        >
          logout
        </button>
      </nav>

      <div className="w-full mt-12 p-2 gap-1 flex flex-col sm:flex-row sm:gap-2">
        {products &&
          products.Items.map((product: any, i) => {
            return (
              <div
                key={i}
                className="flex border border-gray-700 sm:w-36 h-36 sm:flex-col sm:h-60"
              >
                <img
                  src={product.src.S}
                  alt={product.name.S}
                  className="w-1/3 shadow-card sm:w-full sm:h-3/5 object-contain"
                />
                <div className="px-2 flex flex-col justify-between text-white">
                  <div>
                    <h1 className="text-lg text-cyan-200">{product.name.S}</h1>
                    <p className="text-xl text-shadow-label">
                      R${product.price.S}
                    </p>
                  </div>
                  <p className="text-lg text-shadow-price ">
                    6x R$
                    {(
                      parseFloat(
                        product.price.S.replace(/[^\d,]/g, "").replace(",", ".")
                      ) / 6
                    )
                      .toFixed(2)
                      .replace(".", ",")}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
