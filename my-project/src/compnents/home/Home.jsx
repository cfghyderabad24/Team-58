import React from 'react';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" id="cards">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Environmentalist Foundation of India */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src="https://give.do/blog/wp-content/uploads/2022/09/Environmentalist-Foundation-of-India-1024x575.jpg"
              alt="Card image"
            />
            <div className="p-4">
              <p className="text-gray-700">
                EFI focuses on restoring and conserving ecosystems, including water bodies, through community-driven initiatives and policy advocacy.
              </p>
            </div>
          </div>
          
          {/* Tarun Bharat Sangh */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src="https://give.do/blog/wp-content/uploads/2022/09/Tarun-Bharat-Sangh-1024x598.jpg"
              alt="Card image"
            />
            <div className="p-4">
              <p className="text-gray-700">
                Tarun Bharat Sangh is renowned for its community-led efforts in reviving traditional water harvesting systems like 'Johads' in Rajasthan.
              </p>
            </div>
          </div>
          
          {/* Jal Bhagirathi Foundation */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src="https://give.do/blog/wp-content/uploads/2022/09/Jal-Bhagirathi-Foundation-1024x575.jpg"
              alt="Card image"
            />
            <div className="p-4">
              <p className="text-gray-700">
                Jal Bhagirathi Foundation works towards restoring and managing water resources in arid and semi-arid regions of Rajasthan, focusing on equitable water access.
              </p>
            </div>
          </div>

          {/* Sehgal Foundation */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src="https://give.do/blog/wp-content/uploads/2022/09/Sehgal-Foundation-1024x598.jpg"
              alt="Card image"
            />
            <div className="p-4">
              <p className="text-gray-700">
                Sehgal Foundation implements water conservation projects that empower rural communities in India to manage water sustainably.
              </p>
            </div>
          </div>
          
          {/* Centre for Aquatic Livelihood Jaljeevika */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src="https://give.do/blog/wp-content/uploads/2022/09/Centre-for-Aquatic-Livelihood-Jaljeevika-1024x575.jpg"
              alt="Card image"
            />
            <div className="p-4">
              <p className="text-gray-700">
                Jaljeevika focuses on sustainable fisheries management and conservation of aquatic ecosystems to support livelihoods and biodiversity.
              </p>
            </div>
          </div>
          
          {/* Watershed Organisation Trust (WOTR) */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src="https://give.do/blog/wp-content/uploads/2022/09/Watershed-Organisation-Trust-WOTR-1024x598.jpg"
              alt="Card image"
            />
            <div className="p-4">
              <p className="text-gray-700">
                WOTR is dedicated to enhancing water security through watershed development and climate-resilient agriculture practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
