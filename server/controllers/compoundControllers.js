import ChemicalCompound from "../model/chemicalCompounds.model.js";

export const addCompound = async(req,res) => {
    const {CompoundName,CompoundDescription,strImageSource,strImageAttribution} = await req.body;
    let compound = await ChemicalCompound.findOne({ where: { CompoundName: CompoundName } });
    if(compound)
    {
        return res.status(500).json({
            sucess : false,
            message : "compound already exists",
        })
    }

    compound = await ChemicalCompound.create({
        CompoundName:CompoundName,
        CompoundDescription:CompoundDescription,
        strImageSource:strImageSource,
        strImageAttribution:strImageAttribution
    }).catch((error)=>{
        console.log('user not added in table',error);
        return res.status(404).json({
            sucess : false,
            message : "compound not added",
        })
    })

    return res.status(201).json({
        compound,
        sucess : true,
        message : "created successfully",
    })
}

export const getCompound = async (req,res) => {
    const compoundID = await req.params.id

    let compound = await ChemicalCompound.findOne({ where: { id: compoundID } });

    if(!compound)
    {
        return res.status(404).json({
            sucess : false,
            message : "compound not exists",
        })
    }

    return res.status(201).json({
        compound,
        sucess : true,
        message : "fetched successfully",
    })
}

export const getAllCompound = async (req,res) => {
    let compound = await ChemicalCompound.findAll();

    if(!compound)
    {
        return res.status(404).json({
            sucess : false,
            message : "compound not fetched",
        })
    }

    return res.status(201).json({
        compound,
        sucess : true,
        message : "fetched successfully",
    })
}

export const updatedCompound = async (req,res) => {
    const {CompoundName,CompoundDescription,strImageSource,strImageAttribution} = await req.body;

    const compoundID = await req.params.id

    let currentCompound = await ChemicalCompound.findOne({ where: { id: compoundID } });
    if(CompoundName == currentCompound.CompoundName)
    {
        let updatedCompound = await ChemicalCompound.update(
            {
                CompoundName:CompoundName,
                CompoundDescription:CompoundDescription,
                strImageSource:strImageSource,
                strImageAttribution:strImageAttribution 
            },
            {
                where: {
                    CompoundName: CompoundName,
                },
            },
        );
        return res.status(201).json({
            updatedCompound,
            sucess : true,
            message : "fetched successfully",
        })
    }
    else{
        let compound = await ChemicalCompound.findOne({ where: { CompoundName: CompoundName } });
        if(compound)
        {
            return res.status(404).json({
                sucess : false,
                message : "compound exists",
            })
        }

        let updatedCompound = await ChemicalCompound.update(
            {
                CompoundName:CompoundName,
                CompoundDescription:CompoundDescription,
                strImageSource:strImageSource,
                strImageAttribution:strImageAttribution 
            },
            {
                where: {
                    CompoundName: currentCompound.CompoundName,
                },
            },
        );
        return res.status(201).json({
            updatedCompound,
            sucess : true,
            message : "fetched successfully",
        })
    }
    

}
