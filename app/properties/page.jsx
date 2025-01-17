
import PropertyCard from '@/components/PropertyCard';
import ConnectDB from '@/config/database';
import Property from '@/config/models/Property';


const PropertiesPage = async () => {
  await ConnectDB();
  const properties = await Property.find({}).lean();
  return (
   <section className='px-4 py-6 '>
    <div className='container-xl lg:container m-auto px-4 py-6'></div>
      {properties.length === 0 ? (<p>No properties found</p>) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          }
        </div>
      )}
    
   </section>
  )
}

export default PropertiesPage
