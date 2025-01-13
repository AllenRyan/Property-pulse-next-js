import PropertyCard from "@/components/PropertyCard"
import ConnectDB from "@/config/database"
import User from "@/config/models/User"
import { getSessionUser } from "@/utils/getSessionUser"


const savedProperties = async () => {
    const {userId} = await getSessionUser();
    const {bookmars} = await User.findById(userId).populate('bookmars')

  return (
      <section className="px-4 py-6">
          <div className="container lg:container m-auto px-4 py-6">
              <h1 className="text-2xl mb-4">Saved Properties</h1>
              {bookmars.length === 0 ? (<p>No Saved Properties</p>) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {bookmars.map((property) => (
                          <PropertyCard key={property._id} property={property} />
                      ))}
                  </div>
              )}
          </div>
      </section>
  )
}

export default savedProperties