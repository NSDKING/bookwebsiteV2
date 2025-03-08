"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import './css/home.css'
import SearchBar from './components/SearchBar';
import Carousel from './components/Carousel'
import Card from './components/card';
import test1 from './img/test1.jpg'
import test3 from './img/test3.jpg'
import SubHeader from './components/SubHeader';
import BottomTab from './components/BottomTabs';

Amplify.configure(outputs);

const client = generateClient<Schema>();


const imgdata = [
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image:test1,
    author:"jon atajunior",
    date: "2024/12/20",
    type:"Actualité",
  },
  {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image:test3,
    author:"jon atajunior",
    date: "2024/12/20",
    type:"Nouveauté",

  },

]


export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
 

  return (
    <main>
      <h1 className="header-title">laLecturejecontribue</h1>

      <SearchBar/>

      <Carousel datas={imgdata}/>

      <SubHeader activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>

      <div className="card-container">
        {imgdata.map((article, index) => (
          <Card key={index} article={article} />
        ))}
      </div>
      
      <BottomTab/>
    </main>
  );
}
