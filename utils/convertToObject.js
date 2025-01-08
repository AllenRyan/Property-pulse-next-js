export function convertToSerializableObject(leanDocument){
    for(const keys of Object.keys(leanDocument)){
        if(leanDocument[keys].toJSON && leanDocument[keys].toString){
            leanDocument[keys] = leanDocument[keys].toString()
        }
    }
    return leanDocument;
}