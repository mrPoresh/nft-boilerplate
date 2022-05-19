export interface CollectionOptions {
    chain: string;
    address: string;
    limit?: number;
}[];

export interface NFTsOptions {
    chain: string;
    address: string;
    token_id: string;
}[];

export interface OpenSeaPluginOptions {
    network: string, 
    tokenAddress: string, 
    tokenId: string,
    orderSide?: number,
    page?: number, 
}[];

export interface OpenSeaPluginBuyOrder {
    network: string,
    tokenAddress: string,
    tokenId: string,
    tokenType: string,
    amount: number,
    userAddress: string,
    paymentTokenAddress: string,
};

export interface CollectionData {
    
};

export interface NFTData {
    token_address: string;
    token_id: string;
    contract_type: string;
    token_uri?: string | undefined;
    synced_at?: string | undefined;
    amount?: string | undefined;
    name: string;
    symbol: string;
    metadata?: string | undefined; /* {
        image: string,
        name: string,
        description?: string,
    }; */
}[];

export const HomeBanersNFT = [
    {chain: "rinkeby", format:"decimal", address: "0xb74bf94049d2c01f8805b8b15db0909168cabf46", token_id: "660"}
];

export const TrendingCollections = [
    {chain: "rinkeby", address: "0xb74bf94049d2c01f8805b8b15db0909168cabf46", token_id: "219" },  //  Azuki
    {chain: "rinkeby", address: "0x27af21619746a2abb01d3056f971cde936145939", token_id: "1868"},  //  
    {chain: "rinkeby", address: "0xbcd6179f2b7913e85edbb2f311be33ee706110b4", token_id: "11"  },  //  Chetach
];

export const TopCollections = [
    {chain: "rinkeby", address: "0xb74bf94049d2c01f8805b8b15db0909168cabf46", limit: "30"},  //  Azuki
    {chain: "rinkeby", address: "0x16baf0de678e52367adc69fd067e5edd1d33e3bf", limit: "30"},  // kit
    {chain: "rinkeby", address: "0x637a037795358567afce2c3c2c9a190cfe67bf30", limit: "30"},  // astro
    {chain: "rinkeby", address: "0x1817dce4b6f3493b0140c234819693682be0a42f", limit: "30"},  // card
    {chain: "rinkeby", address: "0xe2db42a02a9d70c7de10960c7514d7e7340b553d", limit: "30"},  // gamba
];

export const ArtCollections = [];