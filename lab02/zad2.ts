interface Product {
    id: number,
    name: string,
    price: number
};

interface DigitalProduct extends Product {
    fileSizeMB: number,
    downloadLink: string
}

interface PhysicalProduct extends Product {
    weightKg: number,
    dimensions: {
        width: number,
        height: number,
        depth: number
    }
}

const getProductSummary = (item: DigitalProduct | PhysicalProduct): string => {
    if ("fileSizeMB" in item) {
        return (`Digital Product: ${item.name},
            ID: ${item.id},
            Price: ${item.price},
            FileSize: ${item.fileSizeMB} MB,
            DownloadLink: ${item.downloadLink}`
        )
    }
    return (`Physical Product: ${item.name},
        ID: ${item.id},
        Price: ${item.price}
        Weight: ${item.weightKg} Kg,
        Width: ${item.dimensions.width} m,
        Height ${item.dimensions.height} m,
        Depth: ${item.dimensions.depth} m`
    )
}

const game: DigitalProduct = {
    id: 1,
    name: "Baloniki obrona wieży 9: Zemsta balonusa",
    price: 49,
    fileSizeMB: 15,
    downloadLink: "https://example.com/download"
};

const chair: PhysicalProduct = {
    id: 2,
    name: "Krzesło biurowe",
    price: 299,
    weightKg: 12,
    dimensions: { width: 60, height: 110, depth: 60 }
};

console.log(getProductSummary(game));
console.log(getProductSummary(chair));