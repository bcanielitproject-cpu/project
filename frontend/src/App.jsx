import React, { useEffect, useMemo, useState } from "react";
import { apiRequest } from "./api.js";

const emptyAuth = { phone: "", password: "" };
const fallbackImage =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80";
const accuratePlaceImages = {
  kohima:
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709300/Kohima_city_rtojdx.jpg",
  "dzukou valley": "https://tourism.nagaland.gov.in/wp-content/uploads/2020/08/dzukou.jpg",
  "kisama heritage village":
    "https://tourism.nagaland.gov.in/wp-content/uploads/2020/07/kisama-2.jpg",
  "hornbill festival":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709299/64987170_1733060411_File_Photo_Courtesy_Talimoa_Pongen_psx3ar.jpg",
  mokokchung:
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709298/1702109439_36668999925_59821f3caf_b.jpg_ip2vlc.webp",
  "khonoma green village":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709298/khonoma-nagaland-1024x683_jqnari.jpg",
  "shilloi lake":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709296/images_12_h0uxso.jpg",
  "khezhakeno village":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777710079/images_14_roonfl.jpg",
  "dzudu lake":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709299/images_7_m7pgd9.jpg",
  "chida lake":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709298/chida-resort2_roo032.jpg",
  "kapamodzu peak":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709298/images_9_khxn30.jpg",
  "glory peak":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709299/a8660d13-fbed-4cf9-a0c4-c88ecff2968f_jiniii.jpg",
  pfutsero:
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709298/38202581045_c6e176846c_c_cigckq.jpg",
  "doyang reservoir":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709300/doyang-960x600-1_vig0sq.jpg",
  "mount saramati":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709296/images_11_qsuax9.jpg",
  "fakim wildlife sanctuary":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709299/images_8_z8duvk.jpg",
  "tuophema tourist village":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709296/images_13_ln2ydw.jpg",
  "longwa village":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709297/images_10_xtwouu.jpg"
};
const accurateHotelImages = {
  "hotel japfu": "https://images.trvl-media.com/lodging/43000000/42090000/42081200/42081159/b5a351f0.jpg",
  "hotel de oriental grand":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707750/fef348de41d911ec8b1b0a58a9feac02_nopram.avif",
  "hotel vivor":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707750/36053895-6ea6-4fbb-b9e0-51d4a301c6c6_uydebc.avif",
  "hotel pine":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707748/images_3_yfxo5w.jpg",
  "hotel saramati":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707748/hotel-saramati-walford-colony-dimapur-hotels-nup9n6aque_ypifmg.avif",
  "niathu resort":
    "https://niathu.niathugroup.com/wp-content/uploads/2021/10/HOPRnr_129.jpg",
  "dzukou base homestay":
    "https://tourism.nagaland.gov.in/wp-content/uploads/2020/08/dzukou.jpg",
  "khonoma village homestay":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707749/Exterior-3-Happy-Hues-Homestay-Khonoma-Kohima_vabsqk.jpg",
  "whispering winds homestay":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707746/hotel-whispering-winds-mokokchung-hotels-7twan_b5lvd5.avif",
  "pine view kohima lodge":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707748/hotel-pine_ltodct.jpg",
  "hornbill festival camp":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707749/images_2_desj85.jpg",
  "morung lodge":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707747/images_5_ht0xvs.jpg",
  "wander nagaland mini tourist homestay":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707747/images_4_hxaoe0.jpg",
  "lalhou s homestay":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707746/images_6_ynf3do.jpg",
  "mini tourist lodge":
    "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777707748/1546697499_img_20181125_084150_01.jpeg_pzlk2i.webp"
};

function normalizeName(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getImageFromRecord(record) {
  return record?.images?.[0] || "";
}

function getPlaceImage(place) {
  const mapped = accuratePlaceImages[normalizeName(place?.name)];
  return mapped || getImageFromRecord(place) || fallbackImage;
}

function getHotelImage(hotel) {
  const mapped = accurateHotelImages[normalizeName(hotel?.name)];
  return mapped || getImageFromRecord(hotel) || fallbackImage;
}

const nagalandTopPlaces = [
  {
    _id: "top-kohima",
    name: "Kohima",
    description:
      "Nagaland's capital, known for the War Cemetery, hill viewpoints, local markets, and cultural walks.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709300/Kohima_city_rtojdx.jpg"
    ],
    location: { district: "Kohima", address: "Kohima, Nagaland" }
  },
  {
    _id: "top-dzukou",
    name: "Dzukou Valley",
    description:
      "A famous trekking valley with rolling green hills, seasonal flowers, caves, and quiet campsites.",
    images: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"
    ],
    location: { district: "Kohima", address: "Dzukou Valley, Nagaland" }
  },
  {
    _id: "top-kisama",
    name: "Kisama Heritage Village",
    description:
      "Home of the Hornbill Festival, with traditional Naga morungs, food, crafts, music, and dances.",
    images: [
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80"
    ],
    location: { district: "Kohima", address: "Kisama, near Kohima" }
  },
  {
    _id: "top-hornbill",
    name: "Hornbill Festival",
    description:
      "Nagaland's iconic cultural festival at Kisama, featuring tribal performances, crafts, food, music, and heritage showcases.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709299/64987170_1733060411_File_Photo_Courtesy_Talimoa_Pongen_psx3ar.jpg"
    ],
    location: { district: "Kohima", address: "Kisama Heritage Village, Nagaland" }
  },
  {
    _id: "top-mokokchung",
    name: "Mokokchung",
    description:
      "A charming Ao Naga hill town with viewpoints, villages, churches, and relaxed cultural experiences.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709298/1702109439_36668999925_59821f3caf_b.jpg_ip2vlc.webp"
    ],
    location: { district: "Mokokchung", address: "Mokokchung, Nagaland" }
  },
  {
    _id: "top-khonoma",
    name: "Khonoma Green Village",
    description:
      "An eco-focused Angami village known for terraced fields, forest conservation, and heritage trails.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709298/khonoma-nagaland-1024x683_jqnari.jpg"
    ],
    location: { district: "Kohima", address: "Khonoma, Nagaland" }
  },
  {
    _id: "top-shilloi",
    name: "Shilloi Lake",
    description:
      "A scenic lake near Meluri in Phek district, surrounded by hill ranges close to the Myanmar border.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709296/images_12_h0uxso.jpg"
    ],
    location: { district: "Phek", address: "Shilloi Lake, Meluri, Phek" }
  },
  {
    _id: "top-glory-peak",
    name: "Glory Peak",
    description:
      "A high viewpoint near Pfutsero, known for sweeping mountain views and clear-day glimpses toward distant ranges.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709299/a8660d13-fbed-4cf9-a0c4-c88ecff2968f_jiniii.jpg"
    ],
    location: { district: "Phek", address: "Glory Peak, Pfutsero, Phek" }
  },
  {
    _id: "top-khezhakeno",
    name: "Khezhakeno Village",
    description:
      "A historic Chakhesang village in Phek district, valued for oral traditions, community life, and hill culture.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777710079/images_14_roonfl.jpg"
    ],
    location: { district: "Phek", address: "Khezhakeno, Phek" }
  },
  {
    _id: "top-dzudu",
    name: "Dzudu Lake",
    description:
      "One of Phek district's notable lakes, suited for quiet landscape stops and slow nature travel.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709299/images_7_m7pgd9.jpg"
    ],
    location: { district: "Phek", address: "Dzudu Lake, Phek" }
  },
  {
    _id: "top-chida",
    name: "Chida Lake",
    description:
      "A Phek district lake associated with Khezhakeno, useful for offbeat itineraries around village and lake visits.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709298/chida-resort2_roo032.jpg"
    ],
    location: { district: "Phek", address: "Chida Lake, Khezhakeno, Phek" }
  },
  {
    _id: "top-kapamodzu",
    name: "Kapamodzu Peak",
    description:
      "A prominent Phek-side peak near Zhavame, known for cloud views, village landscapes, and seasonal events.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709298/images_9_khxn30.jpg"
    ],
    location: { district: "Phek", address: "Kapamodzu, Zhavame, Phek" }
  },
  {
    _id: "top-pfutsero",
    name: "Pfutsero",
    description:
      "One of Nagaland's highest towns, a cool-climate base for Glory Peak, terraces, and Phek district routes.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709298/38202581045_c6e176846c_c_cigckq.jpg"
    ],
    location: { district: "Phek", address: "Pfutsero, Phek" }
  },
  {
    _id: "top-doyang",
    name: "Doyang Reservoir",
    description:
      "A Wokha-side water landscape known for reservoir views and seasonal birding around the Doyang area.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709300/doyang-960x600-1_vig0sq.jpg"
    ],
    location: { district: "Wokha", address: "Doyang, Wokha" }
  },
  {
    _id: "top-saramati",
    name: "Mount Saramati",
    description:
      "Nagaland's highest peak in Kiphire district, a major trekking and mountain landscape destination.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709296/images_11_qsuax9.jpg"
    ],
    location: { district: "Kiphire", address: "Saramati, Kiphire" }
  },
  {
    _id: "top-fakim",
    name: "Fakim Wildlife Sanctuary",
    description:
      "A forested wildlife sanctuary near the Myanmar border with ridges, valleys, birds, orchids, and rich fauna.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709299/images_8_z8duvk.jpg"
    ],
    location: { district: "Kiphire", address: "Fakim Wildlife Sanctuary, Kiphire" }
  },
  {
    _id: "top-longwa",
    name: "Longwa Village",
    description:
      "A Konyak village in Mon district known for cross-border geography, traditional houses, and cultural travel.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709297/images_10_xtwouu.jpg"
    ],
    location: { district: "Mon", address: "Longwa, Mon" }
  },
  {
    _id: "top-tuophema",
    name: "Tuophema Tourist Village",
    description:
      "A community tourism village near Kohima with traditional-style stays, food, and Angami cultural experiences.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777709296/images_13_ln2ydw.jpg"
    ],
    location: { district: "Kohima", address: "Tuophema, Kohima" }
  }
];

const nagalandTopHotels = [
  {
    _id: "top-hotel-japfu",
    name: "Hotel Japfu",
    type: "hotel",
    description: "A popular Kohima stay option with easy access to town landmarks and transport.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Kohima",
    pricePerNight: 4200
  },
  {
    _id: "top-hotel-de-oriental",
    name: "Hotel De Oriental Grand",
    type: "hotel",
    description: "A comfortable city hotel for travelers who want central Kohima connectivity.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707750/fef348de41d911ec8b1b0a58a9feac02_nopram.avif"
    ],
    location: "Kohima",
    pricePerNight: 4800
  },
  {
    _id: "top-niathu",
    name: "Niathu Resort",
    type: "hotel",
    description: "A resort-style stay in Dimapur with open lawns, dining, and a quieter setting.",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Dimapur",
    pricePerNight: 5200
  },
  {
    _id: "top-dzukou-homestay",
    name: "Dzukou Base Homestay",
    type: "homestay",
    description: "A simple local homestay option for travelers starting the Dzukou Valley trek.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Viswema",
    pricePerNight: 1800
  },
  {
    _id: "top-khonoma-homestay",
    name: "Khonoma Village Homestay",
    type: "homestay",
    description: "A local village stay suited for slow travel, heritage walks, and countryside views.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707749/Exterior-3-Happy-Hues-Homestay-Khonoma-Kohima_vabsqk.jpg"
    ],
    location: "Khonoma",
    pricePerNight: 2200
  },
  {
    _id: "top-whispering-winds",
    name: "Whispering Winds Homestay",
    type: "homestay",
    description: "A quiet family-run stay for village walks, local meals, and hill views.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707746/hotel-whispering-winds-mokokchung-hotels-7twan_b5lvd5.avif"
    ],
    location: "Mokokchung",
    pricePerNight: 2400
  },
  {
    _id: "top-pine-kohima",
    name: "Pine View Kohima Lodge",
    type: "hotel",
    description: "A practical lodge-style stay near Kohima routes, markets, and sightseeing points.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707748/hotel-pine_ltodct.jpg"
    ],
    location: "Kohima",
    pricePerNight: 3600
  },
  {
    _id: "top-hornbill-camp",
    name: "Hornbill Festival Camp",
    type: "homestay",
    description: "A seasonal camp-style stay close to Kisama for festival visitors.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707749/images_2_desj85.jpg"
    ],
    location: "Kisama",
    pricePerNight: 2800
  },
  {
    _id: "top-morung-lodge",
    name: "Morung Lodge",
    type: "homestay",
    description: "A Kohima bed-and-breakfast style homestay close to city sights and transit points.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707747/images_5_ht0xvs.jpg"
    ],
    location: "Kohima",
    pricePerNight: 3200
  },
  {
    _id: "top-hotel-vivor",
    name: "Hotel Vivor",
    type: "hotel",
    description: "A Kohima hotel option on the Wokha Road side, useful for city stays and dining.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707750/36053895-6ea6-4fbb-b9e0-51d4a301c6c6_uydebc.avif"
    ],
    location: "Kohima",
    pricePerNight: 5200
  },
  {
    _id: "top-hotel-pine",
    name: "Hotel Pine",
    type: "hotel",
    description: "A central Kohima hotel option for travelers wanting easy access to town.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707748/images_3_yfxo5w.jpg"
    ],
    location: "Kohima",
    pricePerNight: 3900
  },
  {
    _id: "top-hotel-saramati",
    name: "Hotel Saramati",
    type: "hotel",
    description: "A government-backed Dimapur hotel with rooms, restaurant, and central connectivity.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707748/hotel-saramati-walford-colony-dimapur-hotels-nup9n6aque_ypifmg.avif"
    ],
    location: "Dimapur",
    pricePerNight: 3000
  },
  {
    _id: "top-longchen",
    name: "Longchen Homestay",
    type: "homestay",
    description: "A Dimapur homestay in a quieter village setting for Naga hospitality and local meals.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Dimapur",
    pricePerNight: 2600
  },
  {
    _id: "top-wander-pfutsero",
    name: "Wander Nagaland Mini Tourist Homestay",
    type: "homestay",
    description: "A Pfutsero/Phek-side homestay for travelers exploring Glory Peak and nearby villages.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707747/images_4_hxaoe0.jpg"
    ],
    location: "Pfutsero",
    pricePerNight: 2200
  },
  {
    _id: "top-lalhou",
    name: "Lalhou's Homestay",
    type: "homestay",
    description: "A Phek-side homestay option around NH29, useful for Kisama and village routes.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/v1777707746/images_6_ynf3do.jpg"
    ],
    location: "Phek",
    pricePerNight: 2100
  },
  {
    _id: "top-mini-tourist-lodge",
    name: "Mini Tourist Lodge",
    type: "hotel",
    description: "A budget lodge option in Pfutsero for Phek district travel and short stays.",
    images: [
      "https://res.cloudinary.com/dzskuvtfn/image/upload/q_auto/f_auto/v1777707748/1546697499_img_20181125_084150_01.jpeg_pzlk2i.webp"
    ],
    location: "Pfutsero",
    pricePerNight: 1700
  }
];

const nagalandTopRestaurants = [
  {
    _id: "top-naga-bowl",
    name: "Naga Bowl",
    description: "Local smoked meats, axone dishes, rice meals, and seasonal vegetables.",
    cuisine: "Naga",
    location: "Kohima",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-hornbill-cafe",
    name: "Hornbill Cafe",
    description: "Cafe-style meals, tea, coffee, and quick plates near popular travel stops.",
    cuisine: "Cafe",
    location: "Kisama",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-bamboo-shoot",
    name: "Bamboo Shoot Kitchen",
    description: "Traditional rice plates, pork dishes, chutneys, and seasonal local vegetables.",
    cuisine: "Traditional Naga",
    location: "Mokokchung",
    images: [
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-kohima-smokehouse",
    name: "Kohima Smokehouse",
    description: "Smoked pork, rice bowls, chutneys, and comforting Naga-style meals.",
    cuisine: "Naga Smokehouse",
    location: "Kohima",
    images: [
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-dimapur-grill",
    name: "Dimapur Grill House",
    description: "Grilled plates, momos, rice meals, and easy casual dining for travelers.",
    cuisine: "Grill",
    location: "Dimapur",
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-kisama-kitchen",
    name: "Kisama Heritage Kitchen",
    description: "Festival-style local plates inspired by community cooking and traditional flavors.",
    cuisine: "Heritage Naga",
    location: "Kisama",
    images: [
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-mokokchung-cafe",
    name: "Mokokchung Hill Cafe",
    description: "Tea, coffee, snacks, rice plates, and a calm hill-town cafe setting.",
    cuisine: "Cafe",
    location: "Mokokchung",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-khonoma-table",
    name: "Khonoma Village Table",
    description: "Simple seasonal meals, local vegetables, rice, and homestyle village cooking.",
    cuisine: "Homestyle",
    location: "Khonoma",
    images: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-fifa-cafe",
    name: "Fifa Cafe",
    description: "A Kohima cafe stop for snacks, drinks, and casual plates between sightseeing.",
    cuisine: "Cafe",
    location: "Kohima",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-vuchu",
    name: "Vuchu Restaurant",
    description: "A Kohima dining option with Naga, Indian, and contemporary plates.",
    cuisine: "Multi-cuisine",
    location: "Kohima",
    images: [
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-morung-cafe",
    name: "Morung Cafe",
    description: "A relaxed Kohima cafe concept inspired by Naga community spaces.",
    cuisine: "Cafe",
    location: "Kohima",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-tsurang",
    name: "Tsurang Restaurant",
    description: "A Dimapur restaurant option for travelers looking for hearty local and Indian meals.",
    cuisine: "Multi-cuisine",
    location: "Dimapur",
    images: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-pfutsero-kitchen",
    name: "Pfutsero Traveller Kitchen",
    description: "Simple meals and warm plates for travelers heading toward Glory Peak and Phek routes.",
    cuisine: "Homestyle",
    location: "Pfutsero",
    images: [
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  },
  {
    _id: "top-meluri-table",
    name: "Meluri Hill Table",
    description: "A Phek-side food stop for simple meals before visiting Shilloi Lake and Meluri routes.",
    cuisine: "Local",
    location: "Meluri",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
    ],
    reviews: []
  }
];
const taxiChoices = ["bike", "four-seater", "six-seater", "custom"];
const featuredPlaceRoutes = [
  {
    id: "phek-classic",
    title: "Phek Classic",
    summary: "High ridges, viewpoints, and iconic lakes",
    stops: ["Kohima", "Pfutsero", "Glory Peak", "Khezhakeno Village", "Shilloi Lake"]
  },
  {
    id: "culture-trail",
    title: "Kohima Culture Trail",
    summary: "Festivals, heritage villages, and local traditions",
    stops: ["Kohima", "Kisama Heritage Village", "Hornbill Festival", "Khonoma Green Village", "Tuophema Tourist Village"]
  },
  {
    id: "lake-loop",
    title: "Lakes and Peaks Loop",
    summary: "Scenic lakes around Phek district",
    stops: ["Chida Lake", "Dzudu Lake", "Kapamodzu Peak", "Glory Peak", "Pfutsero"]
  },
  {
    id: "frontier-trail",
    title: "Eastern Frontier Trail",
    summary: "Border culture and wild landscapes",
    stops: ["Mokokchung", "Longwa Village", "Mount Saramati", "Fakim Wildlife Sanctuary"]
  },
  {
    id: "valley-water-route",
    title: "Valley and Water Route",
    summary: "Green valleys, reservoirs, and hill towns",
    stops: ["Kohima", "Dzukou Valley", "Doyang Reservoir", "Mokokchung"]
  }
];

function toDateInputValue(date) {
  return date.toISOString().slice(0, 10);
}

function getDefaultBookingDates() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return {
    today: toDateInputValue(today),
    tomorrow: toDateInputValue(tomorrow)
  };
}

function getStoredUser() {
  try {
    const stored = localStorage.getItem("nagaland_user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    localStorage.removeItem("nagaland_user");
    localStorage.removeItem("nagaland_token");
    return null;
  }
}

function getStoredTheme() {
  return localStorage.getItem("nagaland_theme") || "light";
}

function getStoredJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function isPhoneViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 1020px)").matches;
}

function buildItineraryId(place) {
  const base = place?._id || normalizeName(place?.name) || "stop";
  return `${base}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function App() {
  const defaultDates = getDefaultBookingDates();
  const [theme, setTheme] = useState(getStoredTheme);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState(emptyAuth);
  const [user, setUser] = useState(getStoredUser);
  const [page, setPage] = useState(() => (getStoredUser() ? "dashboard" : "auth"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardSearch, setDashboardSearch] = useState("");
  const [placeQuery, setPlaceQuery] = useState("");
  const [placeDistrict, setPlaceDistrict] = useState("all");
  const [stayQuery, setStayQuery] = useState("");
  const [restaurantQuery, setRestaurantQuery] = useState("");
  const [restaurantSort, setRestaurantSort] = useState("name");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [wishlist, setWishlist] = useState(() => getStoredJson("nagaland_wishlist", []));
  const [itinerary, setItinerary] = useState(() => getStoredJson("nagaland_itinerary", []));
  const [bookingHistory, setBookingHistory] = useState({ taxis: [], stays: [] });
  const [places, setPlaces] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [taxiForm, setTaxiForm] = useState({
    bookingChoice: "four-seater",
    pickup: "Kohima",
    drop: "Dzukou Valley",
    date: defaultDates.today,
    time: "09:00",
    phone: ""
  });
  const [hotelForm, setHotelForm] = useState({
    hotelId: "",
    bookingChoice: "standard-room",
    checkIn: defaultDates.today,
    checkOut: defaultDates.tomorrow
  });
  const [profileForm, setProfileForm] = useState({
    username: getStoredUser()?.username || ""
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: ""
  });
  const [reviewForms, setReviewForms] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const isLoggedIn = Boolean(user);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("nagaland_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("nagaland_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("nagaland_itinerary", JSON.stringify(itinerary));
  }, [itinerary]);

  useEffect(() => {
    async function loadData() {
      try {
        const [placeData, hotelData, restaurantData] = await Promise.allSettled([
          apiRequest("/places"),
          apiRequest("/hotels"),
          apiRequest("/restaurants")
        ]);

        const safePlaces =
          placeData.status === "fulfilled" && Array.isArray(placeData.value)
            ? placeData.value
            : [];
        const safeHotels =
          hotelData.status === "fulfilled" && Array.isArray(hotelData.value)
            ? hotelData.value
            : [];
        const safeRestaurants =
          restaurantData.status === "fulfilled" && Array.isArray(restaurantData.value)
            ? restaurantData.value
            : [];

        setPlaces(safePlaces);
        setHotels(safeHotels);
        setRestaurants(safeRestaurants);
        setHotelForm((current) => ({
          ...current,
          hotelId: safeHotels[0]?._id || ""
        }));

        if (!safeHotels.length || !safeRestaurants.length) {
          setMessage("Start or seed the backend to enable booking and reviews.");
        }
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    async function loadBookings() {
      const [taxiData, stayData] = await Promise.allSettled([
        apiRequest("/taxis/mine"),
        apiRequest("/hotels/bookings/mine")
      ]);

      setBookingHistory({
        taxis: taxiData.status === "fulfilled" && Array.isArray(taxiData.value) ? taxiData.value : [],
        stays: stayData.status === "fulfilled" && Array.isArray(stayData.value) ? stayData.value : []
      });
    }

    loadBookings();
  }, [isLoggedIn, message]);

  const averageRatings = useMemo(() => {
    return restaurants.reduce((ratings, restaurant) => {
      const reviews = Array.isArray(restaurant.reviews) ? restaurant.reviews : [];
      const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
      ratings[restaurant._id] = reviews.length ? (total / reviews.length).toFixed(1) : "New";
      return ratings;
    }, {});
  }, [restaurants]);

  async function handleAuth(event) {
    event.preventDefault();
    setMessage("");

    try {
      const data = await apiRequest(`/auth/${authMode}`, {
        method: "POST",
        body: JSON.stringify(authForm)
      });

      localStorage.setItem("nagaland_token", data.token);
      localStorage.setItem("nagaland_user", JSON.stringify(data.user));
      setUser(data.user);
      setProfileForm({ username: data.user.username || "" });
      setAuthForm(emptyAuth);
      setTaxiForm((current) => ({ ...current, phone: data.user.phone }));
      setPage("dashboard");
      setMessage(authMode === "login" ? "Logged in successfully." : "Account created.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  function logout() {
    localStorage.removeItem("nagaland_token");
    localStorage.removeItem("nagaland_user");
    setUser(null);
    setPage("auth");
    setMessage("Logged out.");
  }

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  function goToPage(target) {
    setPage(target);
    if (isPhoneViewport()) {
      setSidebarOpen(false);
    }
  }

  function toggleWishlist(place) {
    setWishlist((current) => {
      const exists = current.some((item) => item._id === place._id);
      return exists ? current.filter((item) => item._id !== place._id) : [...current, place];
    });
  }

  function addToItinerary(place) {
    setItinerary((current) => [...current, { ...place, itineraryId: buildItineraryId(place) }]);
    setMessage(`${place.name} added to itinerary.`);
  }

  async function submitTaxiBooking(event) {
    event.preventDefault();
    setMessage("");

    if (!taxiForm.date || !taxiForm.time || !taxiForm.phone) {
      setMessage("Please fill taxi date, time, and phone number before booking.");
      return;
    }

    try {
      const normalizedTaxiForm = {
        ...taxiForm,
        bookingChoice: taxiChoices.includes(taxiForm.bookingChoice)
          ? taxiForm.bookingChoice
          : "four-seater"
      };

      const booking = await apiRequest("/taxis", {
        method: "POST",
        body: JSON.stringify(normalizedTaxiForm)
      });
      setMessage(formatBookingMessage("Taxi booking submitted", booking));
      setTaxiForm((current) => ({
        ...current,
        date: getDefaultBookingDates().today,
        time: "09:00"
      }));
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function submitHotelBooking(event) {
    event.preventDefault();
    setMessage("");

    if (!hotelForm.hotelId) {
      setMessage("Please wait for hotels to load, then choose a hotel or homestay.");
      return;
    }

    if (!hotelForm.checkIn || !hotelForm.checkOut) {
      setMessage("Please choose check-in and check-out dates before booking.");
      return;
    }

    try {
      const booking = await apiRequest("/hotels/bookings", {
        method: "POST",
        body: JSON.stringify(hotelForm)
      });
      setMessage(formatBookingMessage("Hotel or homestay booking submitted", booking));
      const nextDates = getDefaultBookingDates();
      setHotelForm((current) => ({
        ...current,
        checkIn: nextDates.today,
        checkOut: nextDates.tomorrow
      }));
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function cancelTaxiBooking(bookingId) {
    setMessage("");

    try {
      await apiRequest(`/taxis/${bookingId}`, { method: "DELETE" });
      setBookingHistory((current) => ({
        ...current,
        taxis: current.taxis.filter((booking) => booking._id !== bookingId)
      }));
      setMessage("Taxi booking cancelled.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function cancelStayBooking(bookingId) {
    setMessage("");

    try {
      await apiRequest(`/hotels/bookings/${bookingId}`, { method: "DELETE" });
      setBookingHistory((current) => ({
        ...current,
        stays: current.stays.filter((booking) => booking._id !== bookingId)
      }));
      setMessage("Hotel or homestay booking cancelled.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  function bookRideToPlace(place) {
    const destination = place.location?.address || place.name;
    setTaxiForm((current) => ({
      ...current,
      drop: destination,
      pickup: current.pickup || "Kohima",
      bookingChoice: current.bookingChoice || "four-seater"
    }));
    setPage("taxi");
    setMessage(`Cab destination set to ${place.name}. Payment is COD.`);
  }

  async function submitReview(event, restaurantId) {
    event.preventDefault();
    const review = reviewForms[restaurantId] || { rating: 5, comment: "" };
    setMessage("");

    if (restaurantId.startsWith("top-")) {
      setMessage("Restaurants are still loading from MongoDB. Refresh the page, then submit the review.");
      return;
    }

    if (!review.comment.trim()) {
      setMessage("Please type a review comment before submitting.");
      return;
    }

    try {
      const updatedRestaurant = await apiRequest(`/restaurants/${restaurantId}/reviews`, {
        method: "POST",
        body: JSON.stringify(review)
      });

      setRestaurants((current) =>
        current.map((restaurant) =>
          restaurant._id === updatedRestaurant._id ? updatedRestaurant : restaurant
        )
      );
      setReviewForms((current) => ({
        ...current,
        [restaurantId]: { rating: 5, comment: "" }
      }));
      setMessage("Review added.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function submitProfile(event) {
    event.preventDefault();
    setMessage("");

    try {
      const data = await apiRequest("/auth/profile", {
        method: "PATCH",
        body: JSON.stringify(profileForm)
      });
      localStorage.setItem("nagaland_token", data.token);
      localStorage.setItem("nagaland_user", JSON.stringify(data.user));
      setUser(data.user);
      setMessage("Username updated.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function submitPassword(event) {
    event.preventDefault();
    setMessage("");

    try {
      const data = await apiRequest("/auth/password", {
        method: "PATCH",
        body: JSON.stringify(passwordForm)
      });
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setMessage(data.message || "Password changed successfully.");
    } catch (error) {
      setMessage(error.message);
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="auth-page">
        <section className="auth-visual">
          <div className="brand-mark">NT</div>
          <button className="theme-toggle floating" type="button" onClick={toggleTheme}>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <div className="auth-copy">
            <p>Nagaland Tourism</p>
            <h1>Begin your hill journey with one secure phone login.</h1>
          </div>
        </section>

        <section className="auth-panel-wrap">
          <form className="auth-card form" onSubmit={handleAuth}>
            <div>
              <p className="eyebrow">Welcome</p>
              <h2>{authMode === "login" ? "Sign in" : "Create account"}</h2>
            </div>
            <div className="segmented">
              <button
                type="button"
                className={authMode === "login" ? "active" : ""}
                onClick={() => setAuthMode("login")}
              >
                Sign in
              </button>
              <button
                type="button"
                className={authMode === "register" ? "active" : ""}
                onClick={() => setAuthMode("register")}
              >
                Register
              </button>
            </div>
            <label>
              Phone number
              <input
                value={authForm.phone}
                onChange={(event) => setAuthForm({ ...authForm, phone: event.target.value })}
                placeholder="9876543210"
                required
              />
            </label>
            <label>
              Password
              <input
                value={authForm.password}
                onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })}
                type="password"
                minLength={authMode === "register" ? 8 : undefined}
                pattern={authMode === "register" ? "(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}" : undefined}
                title={
                  authMode === "register"
                    ? "Use at least 8 characters with one number and one special character"
                    : undefined
                }
                required
              />
            </label>
            {authMode === "register" && (
              <p className="muted">
                Password must be at least 8 characters and include one number and one special character.
              </p>
            )}
            <button className="primary-action">
              {authMode === "login" ? "Sign in" : "Create account"}
            </button>
            {message && <p className="inline-notice">{message}</p>}
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className={`app-shell ${sidebarOpen ? "" : "sidebar-collapsed"}`}>
      <aside className="sidebar">
        <div className="brand-row">
          <span className="brand-mark small">NT</span>
          <div className="brand-copy">
            <strong>NAGALAND</strong>
            <small>Land of festivals</small>
          </div>
        </div>
        <button
          className="sidebar-toggle inside"
          type="button"
          onClick={() => setSidebarOpen(false)}
        >
          Hide menu
        </button>
        <button className="theme-toggle" type="button" onClick={toggleTheme}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
        <nav className="side-nav">
          {[
            ["dashboard", "EX", "Explore"],
            ["places", "DS", "Destinations"],
            ["saved", "SV", "Saved list"],
            ["taxi", "TR", "Transport"],
            ["stays", "ST", "Stay"],
            ["restaurants", "FD", "Eat & Drink"],
            ["itinerary", "IT", "Itinerary"],
            ["history", "BK", "Bookings"],
            ["profile", "PR", "Profile"]
          ].map(([key, iconCode, label]) => (
            <button
              type="button"
              key={key}
              className={page === key ? "nav-active" : ""}
              onClick={() => goToPage(key)}
            >
              <span className="nav-icon">{iconCode}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <p>Nature. Culture. Heritage.</p>
          <small>Unexplored routes across Nagaland hills.</small>
        </div>
        <div className="helpline-card">
          <p className="eyebrow">Emergency helpline</p>
          <strong>Contact us</strong>
          <a className="contact-link" href="mailto:bcanielitproject@gmail.com">
            bcanielitproject@gmail.com
          </a>
          <a className="contact-link" href="tel:+919366668231">
            +91 93666 68231
          </a>
          <a className="contact-link" href="tel:+919863086981">
            +91 98630 86981
          </a>
        </div>
        <button className="ghost-action" onClick={logout}>
          Logout
        </button>
      </aside>

      <section className="content-shell">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="sidebar-toggle"
              type="button"
              onClick={() => setSidebarOpen((current) => !current)}
            >
              {sidebarOpen ? "Hide" : "Menu"}
            </button>
            <label className="topbar-search">
              <input
                value={dashboardSearch}
                onChange={(event) => setDashboardSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key !== "Enter") return;
                  const query = dashboardSearch.trim();
                  if (!query) return;
                  setPlaceQuery(query);
                  setPage("places");
                }}
                placeholder="Search places, experiences, hotels..."
              />
            </label>
          </div>
          <div className="topbar-meta">
            <span className="weather-pill">23 C Kohima</span>
            <span className="meta-chip">{pageTitle(page)}</span>
            <span className="meta-user">{user.username || user.phone}</span>
          </div>
        </header>
        {message && <p className="toast">{message}</p>}

        <section className="page-stage" key={page}>
          {page === "dashboard" && (
            <Dashboard
              places={places}
              restaurants={restaurants}
              itinerary={itinerary}
              averageRatings={averageRatings}
              setPage={goToPage}
              onSelectPlace={setSelectedPlace}
            />
          )}
          {page === "places" && (
            <PlacesPage
              places={places}
              loading={loading}
              onBookRide={bookRideToPlace}
              placeQuery={placeQuery}
              setPlaceQuery={setPlaceQuery}
              placeDistrict={placeDistrict}
              setPlaceDistrict={setPlaceDistrict}
              onSelectPlace={setSelectedPlace}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToItinerary={addToItinerary}
            />
          )}
          {page === "saved" && (
            <SavedPage
              wishlist={wishlist}
              onSelectPlace={setSelectedPlace}
              onBookRide={bookRideToPlace}
              toggleWishlist={toggleWishlist}
              addToItinerary={addToItinerary}
              setPage={goToPage}
            />
          )}
          {page === "taxi" && (
            <TaxiPage
              taxiForm={taxiForm}
              setTaxiForm={setTaxiForm}
              submitTaxiBooking={submitTaxiBooking}
            />
          )}
          {page === "stays" && (
            <StaysPage
              hotels={hotels}
              stayQuery={stayQuery}
              setStayQuery={setStayQuery}
              hotelForm={hotelForm}
              setHotelForm={setHotelForm}
              submitHotelBooking={submitHotelBooking}
              hasBookableHotels={hotels.length > 0}
            />
          )}
          {page === "restaurants" && (
            <RestaurantsPage
              restaurants={restaurants}
              averageRatings={averageRatings}
              reviewForms={reviewForms}
              setReviewForms={setReviewForms}
              submitReview={submitReview}
              hasReviewableRestaurants={restaurants.length > 0}
              restaurantQuery={restaurantQuery}
              setRestaurantQuery={setRestaurantQuery}
              restaurantSort={restaurantSort}
              setRestaurantSort={setRestaurantSort}
            />
          )}
          {page === "itinerary" && (
            <ItineraryPage
              itinerary={itinerary}
              setItinerary={setItinerary}
              onBookRide={bookRideToPlace}
            />
          )}
      {page === "history" && (
        <BookingHistoryPage
          bookingHistory={bookingHistory}
          cancelTaxiBooking={cancelTaxiBooking}
          cancelStayBooking={cancelStayBooking}
        />
      )}
          {page === "profile" && (
            <ProfilePage
              user={user}
              profileForm={profileForm}
              setProfileForm={setProfileForm}
              passwordForm={passwordForm}
              setPasswordForm={setPasswordForm}
              submitProfile={submitProfile}
              submitPassword={submitPassword}
            />
          )}
        </section>
      </section>

      {selectedPlace && (
        <PlaceModal
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onBookRide={bookRideToPlace}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          addToItinerary={addToItinerary}
        />
      )}
    </main>
  );
}

function pageTitle(page) {
  const titles = {
    dashboard: "Travel Command Center",
    places: "Tourist Places",
    saved: "Saved Places",
    taxi: "Taxi Booking",
    stays: "Hotels & Homestays",
    restaurants: "Restaurants & Reviews",
    itinerary: "Trip Itinerary",
    history: "Booking History",
    profile: "User Profile"
  };

  return titles[page] || "Nagaland Tourism";
}

function formatBookingMessage(prefix, booking) {
  const expiry = booking?.expiresAt
    ? new Date(booking.expiresAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    : "1 hour";

  return `${prefix}. Payment: COD. Valid until ${expiry}.`;
}

function Dashboard({
  places,
  restaurants,
  itinerary,
  averageRatings,
  setPage,
  onSelectPlace
}) {
  const topPlaces = (places.length ? places : nagalandTopPlaces).slice(0, 4);
  const topRestaurants = (restaurants.length ? restaurants : nagalandTopRestaurants).slice(0, 4);
  const itineraryPreview = itinerary.length
    ? itinerary.slice(0, 3)
    : topPlaces.slice(0, 3).map((place, index) => ({ ...place, day: index + 1 }));
  const [plannerTab, setPlannerTab] = useState("stay");
  const plannerTabs = [
    ["stay", "Stay", "stays"],
    ["flight", "Flight", "places"],
    ["transport", "Transport", "taxi"],
    ["experience", "Experience", "itinerary"]
  ];

  function openPlannerTarget(target) {
    if (!target) return;
    setPage(target);
  }

  return (
    <>
      <section className="hero-grid">
        <article className="dashboard-hero">
          <p className="hero-script">Discover</p>
          <h2>Nagaland</h2>
          <p className="hero-tagline">Where nature meets heritage</p>
          <p className="hero-copy">
            From misty mountains and vibrant tribes to unforgettable festivals and flavors.
            Your journey begins here.
          </p>
          <button className="primary-action hero-action" onClick={() => setPage("places")}>
            Explore now
          </button>
        </article>

        <article className="planner-card">
          <div className="section-heading">
            <h2>Plan your trip</h2>
          </div>
          <div className="planner-tabs">
            {plannerTabs.map(([key, label, target]) => (
              <button
                type="button"
                key={key}
                className={plannerTab === key ? "planner-tab planner-tab-active" : "planner-tab"}
                onClick={() => {
                  setPlannerTab(key);
                  openPlannerTarget(target);
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="planner-grid">
            <label>
              Destination
              <input readOnly value="Kohima, Nagaland" />
            </label>
            <label>
              Check in
              <input readOnly value="24 May, 2026" />
            </label>
            <label>
              Travellers
              <input readOnly value="2 Adults, 0 Children" />
            </label>
            <label>
              Room type
              <input readOnly value="Deluxe Room" />
            </label>
          </div>
          <button
            type="button"
            className="primary-action planner-action"
            onClick={() => openPlannerTarget(plannerTab === "transport" ? "taxi" : "stays")}
          >
            Search stays
          </button>
        </article>
      </section>

      <section className="dashboard-lower-grid">
        <article className="places-panel">
          <div className="section-heading">
            <h3>Must visit places</h3>
            <button className="mini-action" onClick={() => setPage("places")}>
              View all
            </button>
          </div>
          <div className="places-grid">
            {topPlaces.map((place) => (
              <button
                type="button"
                className="place-tile"
                key={place._id || place.name}
                onClick={() => onSelectPlace(place)}
              >
                <img src={getPlaceImage(place)} alt={place.name} />
                <div className="place-tile-body">
                  <strong>{place.name}</strong>
                  <span>{place.location?.district || "Nagaland"}</span>
                </div>
              </button>
            ))}
          </div>
        </article>

        <div className="dashboard-side-stack">
          <article className="top-list-panel">
            <div className="section-heading">
              <h3>Top restaurants</h3>
              <button className="mini-action" onClick={() => setPage("restaurants")}>
                View all
              </button>
            </div>
            <div className="rank-list">
              {topRestaurants.map((restaurant) => {
                const rating = averageRatings[restaurant._id] || "4.5";
                return (
                  <article className="rank-item rank-compact" key={restaurant._id || restaurant.name}>
                    <img src={restaurant.images?.[0] || fallbackImage} alt={restaurant.name} />
                    <div>
                      <strong>{restaurant.name}</strong>
                      <p>{restaurant.location || "Nagaland"}</p>
                    </div>
                    <span className="rank-score">{rating}</span>
                  </article>
                );
              })}
            </div>
          </article>

          <article className="top-list-panel">
            <div className="section-heading">
              <h3>Your itinerary</h3>
              <button className="mini-action" onClick={() => setPage("itinerary")}>
                View
              </button>
            </div>
            <div className="rank-list">
              {itineraryPreview.map((entry, index) => (
                <article
                  className="rank-item rank-compact"
                  key={entry.itineraryId || entry._id || `${entry.name}-${index}`}
                >
                  <img src={getPlaceImage(entry)} alt={entry.name} />
                  <div>
                    <strong>Day {index + 1}</strong>
                    <p>{entry.name}</p>
                  </div>
                </article>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="assurance-strip">
        <article>
          <strong>Trusted & secure</strong>
          <p>Your safety is our priority</p>
        </article>
        <article>
          <strong>Best price guarantee</strong>
          <p>Get the best deals always</p>
        </article>
        <article>
          <strong>24/7 support</strong>
          <p>We are here to help</p>
        </article>
        <article>
          <strong>Sustainable tourism</strong>
          <p>Travel responsibly</p>
        </article>
      </section>
    </>
  );
}

function PlacesPage({
  places,
  loading,
  onBookRide,
  placeQuery,
  setPlaceQuery,
  placeDistrict,
  setPlaceDistrict,
  onSelectPlace,
  wishlist,
  toggleWishlist,
  addToItinerary
}) {
  if (loading) return <p className="empty-state">Loading places...</p>;
  const visiblePlaces = places.length ? places : nagalandTopPlaces;
  const districts = ["all", ...new Set(visiblePlaces.map((place) => place.location?.district || "Nagaland"))];
  const filteredPlaces = visiblePlaces.filter((place) => {
    const text = `${place.name} ${place.description} ${place.location?.district} ${place.location?.address}`.toLowerCase();
    const matchesQuery = text.includes(placeQuery.toLowerCase());
    const matchesDistrict =
      placeDistrict === "all" || (place.location?.district || "Nagaland") === placeDistrict;
    return matchesQuery && matchesDistrict;
  });

  return (
    <>
      <div className="tool-panel">
        <input
          value={placeQuery}
          onChange={(event) => setPlaceQuery(event.target.value)}
          placeholder="Search tourist places, districts, routes..."
        />
        <select value={placeDistrict} onChange={(event) => setPlaceDistrict(event.target.value)}>
          {districts.map((district) => (
            <option value={district} key={district}>
              {district === "all" ? "All districts" : district}
            </option>
          ))}
        </select>
      </div>
      <section className="route-strip">
        <p className="eyebrow">Featured routes</p>
        <h2>Popular routes across Nagaland</h2>
        <div className="route-grid">
          {featuredPlaceRoutes.map((route) => (
            <article className="route-card" key={route.id}>
              <strong>{route.title}</strong>
              <p>{route.summary}</p>
              <small>{route.stops.join(" -> ")}</small>
            </article>
          ))}
        </div>
      </section>
      <div className="cards">
        {filteredPlaces.map((place) => {
          const saved = wishlist.some((item) => item._id === place._id);

          return (
            <article className="card" key={place._id}>
              <button className="image-select place-image" onClick={() => onSelectPlace(place)}>
                <img src={getPlaceImage(place)} alt={place.name} />
              </button>
              <div>
                <span className="pill">{place.location?.district || "Nagaland"}</span>
                <h3>{place.name}</h3>
                <p>{place.description}</p>
                <small>{place.location?.address || "Nagaland, India"}</small>
                <div className="card-actions">
                  <button className="card-action" onClick={() => onBookRide(place)}>
                    Book ride - COD
                  </button>
                  <button className="soft-action" onClick={() => toggleWishlist(place)}>
                    {saved ? "Saved" : "Save"}
                  </button>
                  <button className="soft-action" onClick={() => addToItinerary(place)}>
                    Add trip
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

function TaxiPage({ taxiForm, setTaxiForm, submitTaxiBooking }) {
  return (
    <form className="pro-panel form wide-form" onSubmit={submitTaxiBooking}>
      <div>
        <p className="eyebrow">Protected route</p>
        <h2>Reserve a taxi</h2>
      </div>
      <div className="booking-policy">
        <span>Payment method: COD</span>
        <span>Booking validity: 1 hour</span>
      </div>
      <div className="form-grid">
        <label>
          Your taxi choice
          <select
            value={taxiChoices.includes(taxiForm.bookingChoice) ? taxiForm.bookingChoice : "four-seater"}
            onChange={(event) =>
              setTaxiForm({ ...taxiForm, bookingChoice: event.target.value })
            }
            required
          >
            <option value="bike">Bike</option>
            <option value="four-seater">4 seater cab</option>
            <option value="six-seater">6 seater cab</option>
            <option value="custom">Custom request</option>
          </select>
        </label>
        <label>
          Pickup
          <input
            value={taxiForm.pickup}
            onChange={(event) => setTaxiForm({ ...taxiForm, pickup: event.target.value })}
            required
          />
        </label>
        <label>
          Drop
          <input
            value={taxiForm.drop}
            onChange={(event) => setTaxiForm({ ...taxiForm, drop: event.target.value })}
            required
          />
        </label>
        <label>
          Date
          <input
            type="date"
            value={taxiForm.date}
            onChange={(event) => setTaxiForm({ ...taxiForm, date: event.target.value })}
            required
          />
        </label>
        <label>
          Time
          <input
            type="time"
            value={taxiForm.time}
            onChange={(event) => setTaxiForm({ ...taxiForm, time: event.target.value })}
            required
          />
        </label>
        <label>
          Phone
          <input
            value={taxiForm.phone}
            onChange={(event) => setTaxiForm({ ...taxiForm, phone: event.target.value })}
            required
          />
        </label>
      </div>
      <button className="primary-action">Book taxi</button>
    </form>
  );
}

function StaysPage({
  hotels,
  stayQuery,
  setStayQuery,
  hotelForm,
  setHotelForm,
  submitHotelBooking,
  hasBookableHotels
}) {
  const visibleHotels = hotels.length ? hotels : nagalandTopHotels;
  const filteredHotels = visibleHotels.filter((hotel) =>
    `${hotel.name} ${hotel.location} ${hotel.type} ${hotel.description}`
      .toLowerCase()
      .includes(stayQuery.toLowerCase())
  );

  function selectStay(hotel) {
    setHotelForm((current) => ({
      ...current,
      hotelId: hotel._id,
      bookingChoice: hotel.type === "homestay" ? "homestay-room" : current.bookingChoice
    }));
  }

  return (
    <div className="split-layout stay-layout">
      <form className="pro-panel form stay-form" onSubmit={submitHotelBooking}>
        <div>
          <p className="eyebrow">Protected route</p>
          <h2>Book your stay</h2>
        </div>
        <div className="booking-policy">
          <span>Payment method: COD</span>
          <span>Booking validity: 1 hour</span>
        </div>
        <fieldset disabled={!hasBookableHotels}>
          <label>
            Hotel or homestay
            <select
              value={hotelForm.hotelId}
              onChange={(event) => setHotelForm({ ...hotelForm, hotelId: event.target.value })}
              required
            >
              {visibleHotels.map((hotel) => (
                <option value={hotel._id} key={hotel._id}>
                  {hotel.name} - {hotel.type}
                </option>
              ))}
            </select>
          </label>
          <label>
            Your room choice
            <select
              value={hotelForm.bookingChoice}
              onChange={(event) =>
                setHotelForm({ ...hotelForm, bookingChoice: event.target.value })
              }
              required
            >
              <option value="standard-room">Standard room</option>
              <option value="deluxe-room">Deluxe room</option>
              <option value="family-room">Family room</option>
              <option value="homestay-room">Homestay room</option>
              <option value="custom">Custom request</option>
            </select>
          </label>
          <label>
            Check-in
            <input
              type="date"
              value={hotelForm.checkIn}
              onChange={(event) => setHotelForm({ ...hotelForm, checkIn: event.target.value })}
              required
            />
          </label>
          <label>
            Check-out
            <input
              type="date"
              value={hotelForm.checkOut}
              onChange={(event) => setHotelForm({ ...hotelForm, checkOut: event.target.value })}
              required
            />
          </label>
          <button className="primary-action">Book stay</button>
        </fieldset>
        {!hasBookableHotels && (
          <p className="muted">
            Hotels are still loading from MongoDB. Refresh the page if this message stays visible.
          </p>
        )}
      </form>

      <div className="stay-list stay-catalog">
        <div className="tool-panel compact stay-tool">
          <input
            value={stayQuery}
            onChange={(event) => setStayQuery(event.target.value)}
            placeholder="Search hotels, homestays, district..."
          />
        </div>
        {filteredHotels.map((hotel) => (
          <article
            className={`horizontal-card stay-card ${hotelForm.hotelId === hotel._id ? "selected-card" : ""}`}
            key={hotel._id}
            onClick={() => selectStay(hotel)}
          >
            <button
              className="image-select"
              type="button"
              onClick={() => selectStay(hotel)}
              aria-label={`Select ${hotel.name}`}
            >
              <img src={getHotelImage(hotel)} alt={hotel.name} />
            </button>
            <div>
              <span className="pill">{hotel.type}</span>
              <h3>{hotel.name}</h3>
              <p>{hotel.description}</p>
              <small>{hotel.location} - Rs {hotel.pricePerNight}/night</small>
              <span className="select-hint">
                {hotelForm.hotelId === hotel._id ? "Selected for booking" : "Tap image to select"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function RestaurantsPage({
  restaurants,
  averageRatings,
  reviewForms,
  setReviewForms,
  submitReview,
  hasReviewableRestaurants,
  restaurantQuery,
  setRestaurantQuery,
  restaurantSort,
  setRestaurantSort
}) {
  const visibleRestaurants = restaurants.length ? restaurants : nagalandTopRestaurants;
  const filteredRestaurants = [...visibleRestaurants]
    .filter((restaurant) =>
      `${restaurant.name} ${restaurant.cuisine} ${restaurant.location} ${restaurant.description}`
        .toLowerCase()
        .includes(restaurantQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (restaurantSort === "rating") {
        const ratingA = Number(averageRatings[a._id]) || 0;
        const ratingB = Number(averageRatings[b._id]) || 0;
        return ratingB - ratingA;
      }

      return a.name.localeCompare(b.name);
    });

  return (
    <div className="restaurant-list">
      <div className="tool-panel">
        <input
          value={restaurantQuery}
          onChange={(event) => setRestaurantQuery(event.target.value)}
          placeholder="Search restaurants, cuisine, district..."
        />
        <select value={restaurantSort} onChange={(event) => setRestaurantSort(event.target.value)}>
          <option value="name">Sort by name</option>
          <option value="rating">Sort by rating</option>
        </select>
      </div>
      {!hasReviewableRestaurants && (
        <p className="empty-state">
          Top restaurants are shown below. Start or seed the backend to enable reviews.
        </p>
      )}
      {filteredRestaurants.map((restaurant) => {
        const form = reviewForms[restaurant._id] || { rating: 5, comment: "" };
        const rating = averageRatings[restaurant._id] || "New";

        return (
          <article className="restaurant" key={restaurant._id}>
            <img src={restaurant.images?.[0] || fallbackImage} alt={restaurant.name} />
            <div className="restaurant-body">
              <div>
                <span className="pill">{restaurant.cuisine}</span>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.description}</p>
                <small>{restaurant.location} - Rating {rating}</small>
                <div className="stars" aria-label={`Rating ${rating}`}>
                  {"★★★★★".slice(0, Math.round(Number(rating) || 0))}
                  <span>{"★★★★★".slice(Math.round(Number(rating) || 0))}</span>
                </div>
              </div>
              <div className="reviews">
                {(restaurant.reviews || []).slice(-2).map((review) => (
                  <blockquote key={review._id}>
                    {review.rating}/5 - {review.comment}
                  </blockquote>
                ))}
              </div>
              <form
                className="review-form"
                onSubmit={(event) => submitReview(event, restaurant._id)}
              >
                <fieldset>
                  <select
                    value={form.rating}
                    onChange={(event) =>
                      setReviewForms({
                        ...reviewForms,
                        [restaurant._id]: {
                          ...form,
                          rating: Number(event.target.value)
                        }
                      })
                    }
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option value={rating} key={rating}>
                        {rating} stars
                      </option>
                    ))}
                  </select>
                  <input
                    value={form.comment}
                    onChange={(event) =>
                      setReviewForms({
                        ...reviewForms,
                        [restaurant._id]: {
                          ...form,
                          comment: event.target.value
                        }
                      })
                    }
                    placeholder="Add a review"
                    required
                  />
                  <button>Review</button>
                </fieldset>
              </form>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function PlaceModal({ place, onClose, onBookRide, wishlist, toggleWishlist, addToItinerary }) {
  const saved = wishlist.some((item) => item._id === place._id);

  return (
    <div className="modal-shell">
      <button className="modal-scrim" type="button" onClick={onClose} />
      <article className="place-modal">
        <img src={getPlaceImage(place)} alt={place.name} />
        <div className="place-modal-body">
          <div className="section-heading">
            <div>
              <span className="pill">{place.location?.district || "Nagaland"}</span>
              <h2>{place.name}</h2>
            </div>
            <button className="drawer-close" type="button" onClick={onClose}>
              Close
            </button>
          </div>
          <p>{place.description}</p>
          <small>{place.location?.address || "Nagaland, India"}</small>
          <div className="modal-actions">
            <button className="primary-action" onClick={() => onBookRide(place)}>
              Book ride - COD
            </button>
            <button className="soft-action" onClick={() => toggleWishlist(place)}>
              {saved ? "Saved" : "Save place"}
            </button>
            <button className="soft-action" onClick={() => addToItinerary(place)}>
              Add to itinerary
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

function SavedPage({ wishlist, onSelectPlace, onBookRide, toggleWishlist, addToItinerary, setPage }) {
  if (!wishlist.length) {
    return (
      <div className="empty-state saved-empty">
        <h3>No saved places yet</h3>
        <p>Open Tourist Places and tap Save to build your saved list.</p>
        <button type="button" className="mini-action" onClick={() => setPage("places")}>
          Browse places
        </button>
      </div>
    );
  }

  return (
    <div className="saved-list">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Saved list</p>
          <h2>Your saved places</h2>
        </div>
      </div>
      <div className="cards">
        {wishlist.map((place) => (
          <article className="card saved-card" key={place._id}>
            <button
              type="button"
              className="image-select place-image"
              onClick={() => onSelectPlace(place)}
            >
              <img src={getPlaceImage(place)} alt={place.name} />
            </button>
            <div>
              <span className="pill">{place.location?.district || "Nagaland"}</span>
              <h3>{place.name}</h3>
              <p>{place.description}</p>
              <small>{place.location?.address || "Nagaland, India"}</small>
              <div className="card-actions">
                <button type="button" className="card-action" onClick={() => onBookRide(place)}>
                  Book ride - COD
                </button>
                <button type="button" className="soft-action" onClick={() => addToItinerary(place)}>
                  Add trip
                </button>
                <button type="button" className="soft-action" onClick={() => toggleWishlist(place)}>
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ItineraryPage({ itinerary, setItinerary, onBookRide }) {
  if (!itinerary.length) {
    return <p className="empty-state">No trip plan yet. Add places from Tourist Places.</p>;
  }

  return (
    <div className="itinerary-list">
      {itinerary.map((place, index) => {
        const itineraryKey = place.itineraryId || `${place._id || normalizeName(place?.name)}-${index}`;

        return (
          <article className="rank-item itinerary-item" key={itineraryKey}>
            <span>Day {index + 1}</span>
            <img src={getPlaceImage(place)} alt={place.name} />
            <div>
              <h3>{place.name}</h3>
              <p>{place.location?.address || "Nagaland, India"}</p>
              <div className="mini-actions">
                <button className="soft-action" onClick={() => onBookRide(place)}>
                  Book ride
                </button>
                <button
                  className="soft-action"
                  onClick={() =>
                    setItinerary((current) =>
                      current.filter((item, itemIndex) => {
                        const itemKey =
                          item.itineraryId ||
                          `${item._id || normalizeName(item?.name)}-${itemIndex}`;
                        return itemKey !== itineraryKey;
                      })
                    )
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function BookingHistoryPage({ bookingHistory, cancelTaxiBooking, cancelStayBooking }) {
  return (
    <div className="split-layout">
      <section className="top-list-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">COD rides</p>
            <h2>Taxi bookings</h2>
          </div>
        </div>
        <div className="rank-list">
          {bookingHistory.taxis.length ? (
            bookingHistory.taxis.map((booking, index) => (
              <article className="history-item" key={booking._id}>
                <strong>{index + 1}. {booking.bookingChoice}</strong>
                <p>{booking.pickup} -&gt; {booking.drop}</p>
                <small>{booking.date?.slice(0, 10)} at {booking.time} - COD - valid till {formatTime(booking.expiresAt)}</small>
                <div className="mini-actions">
                  <button
                    type="button"
                    className="soft-action danger-action"
                    onClick={() => cancelTaxiBooking(booking._id)}
                  >
                    Cancel booking
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="muted">No taxi bookings yet.</p>
          )}
        </div>
      </section>

      <section className="top-list-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">COD stays</p>
            <h2>Hotel bookings</h2>
          </div>
        </div>
        <div className="rank-list">
          {bookingHistory.stays.length ? (
            bookingHistory.stays.map((booking, index) => (
              <article className="history-item" key={booking._id}>
                <strong>{index + 1}. {booking.hotelId?.name || "Selected stay"}</strong>
                <p>{booking.bookingChoice}</p>
                <small>{booking.checkIn?.slice(0, 10)} -&gt; {booking.checkOut?.slice(0, 10)} - COD - valid till {formatTime(booking.expiresAt)}</small>
                <div className="mini-actions">
                  <button
                    type="button"
                    className="soft-action danger-action"
                    onClick={() => cancelStayBooking(booking._id)}
                  >
                    Cancel booking
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="muted">No hotel or homestay bookings yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function formatTime(value) {
  if (!value) return "1 hour";
  return new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function ProfilePage({
  user,
  profileForm,
  setProfileForm,
  passwordForm,
  setPasswordForm,
  submitProfile,
  submitPassword
}) {
  return (
    <div className="split-layout">
      <form className="pro-panel form" onSubmit={submitProfile}>
        <div>
          <p className="eyebrow">Account</p>
          <h2>Update username</h2>
          <p>Phone number: {user.phone}</p>
        </div>
        <label>
          Username
          <input
            value={profileForm.username}
            onChange={(event) => setProfileForm({ username: event.target.value })}
            placeholder="Your name"
            minLength="2"
            maxLength="40"
            required
          />
        </label>
        <button className="primary-action">Save username</button>
      </form>

      <form className="pro-panel form" onSubmit={submitPassword}>
        <div>
          <p className="eyebrow">Security</p>
          <h2>Change password</h2>
        </div>
        <label>
          Current password
          <input
            value={passwordForm.currentPassword}
            onChange={(event) =>
              setPasswordForm({ ...passwordForm, currentPassword: event.target.value })
            }
            type="password"
            required
          />
        </label>
        <label>
          New password
          <input
            value={passwordForm.newPassword}
            onChange={(event) =>
              setPasswordForm({ ...passwordForm, newPassword: event.target.value })
            }
            type="password"
            minLength="8"
            pattern="(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}"
            title="Use at least 8 characters with one number and one special character"
            required
          />
        </label>
        <button className="primary-action">Change password</button>
      </form>
    </div>
  );
}

export default App;
