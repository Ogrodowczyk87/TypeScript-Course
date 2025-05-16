import React, { useEffect, useState } from 'react';
import type { JSX } from 'react';
import axios from 'axios';
import { Planet, SWAPIResponse } from '../types';

interface PlanetsGridProps {
  as?: keyof JSX.IntrinsicElements;
  columns: number;
  children: (planet: Planet) => React.ReactNode;
}

export function PlanetsGrid({ as: Component = 'div', columns, children }: PlanetsGridProps) {
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const { data } = await axios.get<SWAPIResponse>('https://swapi.dev/api/planets/');
        setPlanets(data.results);
      } catch (error) {
        setPlanets([]);
      }
    };
    fetchPlanets();
  }, []);

  return (
    <Component data-testid="planets-grid" className={`bg-gray-900`}>
      <div className={`grid gap-6 grid-cols-1 md:grid-cols-${columns} auto-rows-fr`}>
        {planets.map((planet) => (
          <div key={planet.url} className="h-full">
            {children(planet)}
          </div>
        ))}
      </div>
    </Component>
  );
}
