import { fs } from "../dependencies.js";
import { io } from '../index.js';
import fireStoreDB from '../firebase-config.js';

export const postUserData = (req, res) => {
  try {
    const dataUsers = fs.readFileSync('./localCollection/users.json'); // read existing data from users.json file
    const dataInteractions = fs.readFileSync('./localCollection/interactions.json'); // read existing data from users.json file
    const jsonDataUsers = JSON.parse(dataUsers);
    const jsonDataInteractions = JSON.parse(dataInteractions);
    const { newLead, newInteraction } = req.body;   // deconstruct the new user object from request body
    const jsonUser = {
      id: jsonDataUsers.users.length + 1, // generate new user ID
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      privacyAgreement: newLead.privacyAgreement,
      date: newLead.date,
      timeStamp: newLead.timeStamp,
      location: newLead.location,
      OS: newLead.OS
    };

    console.log('USER --------', jsonUser);

    const jsonInteraction = {
      id: jsonDataInteractions.interactions.length + 1, // generate new user ID
      privacyAgreement: newInteraction.privacyAgreement,
      date: newInteraction.date,
      timeStamp: newInteraction.timeStamp,
      OS: newInteraction.OS
    };

    jsonDataUsers.users.push(jsonUser);  // add new user to existing data
    jsonDataInteractions.interactions.push(jsonInteraction);  // add new interaction to existing data
    fs.writeFileSync('./localCollection/users.json', JSON.stringify(jsonDataUsers, null, 2)); // write updated data back to users.json file
    fs.writeFileSync('./localCollection/interactions.json', JSON.stringify(jsonDataInteractions, null, 2)); // write updated data back to users.json file
    
    io.emit('real-time-update', { state: true });

    res.status(201).send({ msn: `User ${jsonUser.id} created` }); // send response indicating successful creation of new user
  } catch (error) {
    // handle any errors that occur
    console.error(error);
    res.status(500).send('Error adding user');
  }
}

export const postNoLeadInteraction = (req, res) => {

  //res.send(req.body);
  try {
    const data = fs.readFileSync('./localCollection/interactions.json'); // read existing data from users.json file
    const jsonData = JSON.parse(data);
    const { noLead } = req.body;   // deconstruct the new user object from request body
    const jsonInteraction = {
      id: jsonData.interactions.length + 1, // generate new user ID
      privacyAgreement: noLead.privacyAgreement,
      date: noLead.date,
      timeStamp: noLead.timeStamp,
      OS: noLead.OS
    };
    jsonData.interactions.push(jsonInteraction);  // add new user to existing data
    fs.writeFileSync('./localCollection/interactions.json', JSON.stringify(jsonData, null, 2)); // write updated data back to users.json file

    io.emit('real-time-update', { state: true });

    res.status(201).send({ msn: `User ${jsonInteraction.id} created` }); // send response indicating successful creation of new user
  } catch (error) {
    // handle any errors that occur
    console.error(error);
    res.status(500).send('Error adding user');
  }
}

export const getUsers = (req, res) => {
  res.send({ mns: 'Hello!' });
}