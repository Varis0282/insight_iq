import UserCtrl from '../controller/user.js';
import authentication from '../middleware/authentication.js'

export default (app) => {
    app.post('/api/login', async (req, res) => {
        const { body } = req;
        const resp = await UserCtrl.login(body);
        res.json(resp);
    })
    app.post('/api/signup', async (req, res) => {
        const { body } = req;
        const resp = await UserCtrl.add(body);
        res.json(resp);
    })
    app.get('/api/me', authentication, async (req, res) => {
        const { body, user } = req;
        res.json({ success: true, data: user });
    })
}