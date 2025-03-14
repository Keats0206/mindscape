export interface Garment {
    id: string;
    brand: string;
    productName: string;
    color: string;
    style: string;
    fit: string;
    material: string;
    pattern: string;
    price: number;
    image: string;
    category: 'upper_body' | 'lower_body';
  }
  
  export const items: Garment[] = [
      {
          id: "1",
          brand: "Dries Van Noten",
          productName: "Oversized Cotton-Blend Sweater",
          color: "Cream",
          style: "Casual Luxury",
          fit: "Oversized",
          material: "cotton-blend knit",
          pattern: "cable-knit",
          price: 890,
          image: "/uppergarment.png",
          category: "upper_body",
      },
      {
          id: "2",
          brand: "SAINT LAURENT",
          productName: "Pinstriped Crepe Shirt",
          color: "Red",
          style: "Slim fit, smart collar",
          fit: "Comfortable fit",
          material: "Crepe",
          pattern: "Pinstripes",
          price: 1350,
          image: "/uppergarment1.png",
          category: "upper_body",
      },
      {
          id: "3",
          brand: "CELINE HOMME",
          productName: "Teddy Embellished Wool-Flannel Bomber Jacket",
          color: "Navy",
          style: "Ornately beaded with a lion at the chest, ribbed trims",
          fit: "Regular fit",
          material: "Wool-flannel",
          pattern: "Solid with beaded embellishment",
          price: 5300,
          image: "/uppergarment2.png",
          category: "upper_body",
      },
      {
          id: "4",
          brand: "Fear of God",
          productName: "Wide-Leg Pleated Wool Trousers",
          color: "Charcoal Grey",
          style: "Contemporary",
          fit: "Wide-leg",
          material: "wool blend",
          pattern: "pleated",
          price: 995,
          image: "/lowergarment.png",
          category: "lower_body",
      },
      {
          id: "5",
          brand: "CELINE HOMME",
          productName: "Keith Slim-Fit Pleated Wool and Mohair-Blend Twill Trousers",
          color: "Black",
          style: "Slim fit, neat front pleats",
          fit: "Slim shape",
          material: "Wool and Mohair blend",
          pattern: "Twill",
          price: 1200,
          image: "/lowergarment1.png",
          category: "lower_body",
      },
      {
          id: "6",
          brand: "ENFANTS RICHES DÉPRIMÉS",
          productName: "Straight-Leg Embellished Distressed Leather Trousers",
          color: "Black",
          style: "Straight-leg, engraved medallion embellishments",
          fit: "Straight-leg profile",
          material: "Distressed leather",
          pattern: "Solid",
          price: 3950,
          image: "/lowergarment2.png",
          category: "lower_body",
      }
  ];
  