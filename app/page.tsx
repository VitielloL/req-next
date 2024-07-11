"use client";

import { useState, useEffect } from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  const URL_API = 'https://jsonplaceholder.typicode.com/todos/';
  // const URL_API = 'https://jsonplaceholder.typicode.com/todos/1'
  const [data, setData] = useState<Todo[] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await fetch(URL_API);
      const data: Todo[] = await response.json();

      if (!data) {
        throw new Error('Problema na Requisição');
      }
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading && !data && <p>Carregando Informações...</p>}

      {data && data.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
