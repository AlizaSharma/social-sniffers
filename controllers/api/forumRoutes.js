const router = require('express').Router();
const { Forum } = require('../../models');
const withAuth = require('../../utlis/auth');

router.get('/', async (req, res) => {
    try {
        const forumData = await Forum.findAll();
        res.status(200).json(forumData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newForum = await Forum.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newForum);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const forumData = await Forum.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!forumData) {
            res.status(404).json({ message: 'No forum found with this id!' });
            return;
        }
        res.status(200).json(forumData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const forumData = await Forum.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!forumData) {
            res.status(404).json({ message: 'No forum found with this id!' });
            return;
        }
        res.status(200).json(forumData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;