import React from 'react';
import { useParams } from 'react-router-dom';
import { STEMGameEngine } from './STEMGameEngine.tsx';
import { PHOTOSYNTHESIS_GAME_DATA } from './data/photosynthesisData.ts';

export const PhotosynthesisGamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <STEMGameEngine
      config={PHOTOSYNTHESIS_GAME_DATA}
      lessonIdToReturn={id}
    />
  );
};

export default PhotosynthesisGamePage;
