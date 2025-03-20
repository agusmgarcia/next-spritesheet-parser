import { useDevicePixelRatio, useDimensions } from "@agusmgarcia/react-core";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { useSpriteSheet } from "#src/store";
import { useLoadImage } from "#src/utils";

import type MainContentProps from "./MainContent.types";

export default function useMainContent(props: MainContentProps) {
  const { spriteSheet } = useSpriteSheet();

  const rootRef = useRef<HTMLDivElement>(null);
  const normalMapCanvasRef = useRef<HTMLCanvasElement>(null);

  const { image } = useLoadImage(spriteSheet?.sheet.imageURL || "");
  const rootDimensions = useDimensions(rootRef);
  const devicePixelRatio = useDevicePixelRatio();

  useEffect(() => {
    if (!image) return;

    const normalMapCanvas = normalMapCanvasRef.current;
    if (!normalMapCanvas) return;

    const width = Math.max(
      rootDimensions.width,
      image.width * devicePixelRatio,
    );

    const height = Math.max(
      rootDimensions.height,
      image.height * devicePixelRatio,
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: normalMapCanvas,
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(devicePixelRatio);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    camera.position.set(0, 0, 1000);
    camera.lookAt(0, 0, 0);

    // Sprite sheet
    const spriteSheetImage = new THREE.Mesh(
      new THREE.BoxGeometry(width, height),
      new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(spriteSheet?.sheet.imageURL || ""),
      }),
    );

    // Directional light
    const directionalLight = new THREE.DirectionalLight();

    // Scene
    const scene = new THREE.Scene();
    scene.add(spriteSheetImage);
    scene.add(directionalLight);

    // Render
    renderer.render(scene, camera);

    return () => {
      directionalLight.dispose();
      spriteSheetImage.geometry.dispose();
      spriteSheetImage.material.dispose();
      renderer.dispose();
    };
  }, [
    devicePixelRatio,
    image,
    rootDimensions.height,
    rootDimensions.width,
    spriteSheet?.sheet.imageURL,
  ]);

  return { ...props, normalMapCanvasRef, rootRef };
}
