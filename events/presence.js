const client = require('../index');
const db = require('../mongodels/pres.js');
const sendError = require('../mores/error');
const sendDone = require('../mores/success');

client.on('presenceUpdate', async (oldState, newState) => {
    if(!newState || !oldState) return;
    if(newState.user.bot || oldState.user.bot) return;
    const {
        guild
    } = newState;

    await db.findOne({
        guild: guild.id
    }, async (err, data) => {
        if (!data) return;
        let des = data.content.descrip;
        let ro = data.content.role;

        //console.log(oldState, newState);
        //console.log(newState.activities[0], newState.activities[0].state);

        if (newState.activities[0].state.toLowerCase() == des.toLowerCase()) {
            console.log('Yes')
            const rol = guild.roles.cache.get(ro);
            const mem = guild.members.cache.get(newState.user.id);
            await mem.roles.add(rol);
            mem.send('You have been verified!')
        } else  if (newState.activities[0].state.toLowerCase().includes(des.toLowerCase())) {
            console.log('Yes')
            const rol = guild.roles.cache.get(ro);
            const mem = guild.members.cache.get(newState.user.id);
            await mem.roles.add(rol);
            mem.send('You have been verified!')
        }
    })

})