"use client";
import Converter from "@/components/Converter";
import Footer from "@/components/Footer";
import PriceUpdate from "@/components/PriceUpdate";
import Title from "@/components/Title";
import { PriceData } from "@/models/pricedata";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/price");
    const data: PriceData = await res.json();
    setPriceData(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = async () => {
    await fetchData();
  };

  return (
    <>
      <Title />
      <main className="flex flex-col items-center">
        <Converter priceData={priceData} onRefresh={onRefresh} />
        <PriceUpdate date={priceData?.date?.toString()} />
      </main>
      <Footer />
    </>
  );
}
