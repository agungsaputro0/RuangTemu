declare module 'panolens' {
  export class Viewer {
    constructor(options?: any);
    add(element: any): void;
    remove(element: any): void;
    setPanorama(panorama: any): void;
    dispose(): void; // ✅ Tambahkan ini
  }

  export class ImagePanorama {
    constructor(image: string, options?: any);
    link(panorama: ImagePanorama, position?: any, image?: string, scale?: number): void;
  }

  export class Infospot {
    constructor(size?: number, image?: string, animated?: boolean);
    position: any;
    addHoverText(text: string, position?: number): void;
    addEventListener(event: string, callback: (e?: any) => void): void;
  }
}
