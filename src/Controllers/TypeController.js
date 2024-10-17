import Type from '../Models/TypeModel.js'; 


const getAllType = async (req, res) => {
  try {
    const types = await Type.find();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const createType = async (req, res) => {
  const { wastetype,typedescription } = req.body;

  const type = new Type({
   wastetype,
   typedescription
    
  });

  try {
    const newType = await type.save();
    res.status(201).json(newType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export default {
    createType,
    getAllType
};
