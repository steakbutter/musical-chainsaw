const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
        });
        if (!postData) {
            res.status(400).json({ message: 'No post with that id'});
            return;
        };
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
    const updatePost = await Post.update({
        title: req.body.title,
        content: req.body.content,
    },
    {
        where: { id: req.params.id},
    }
);
res.status(200).json(updatePost)      
    } catch (error) {
        res.status(400).json(updatePost)
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where:{
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if(!deletePost) {
            res.status(400).json({ message: 'No post found with that id'});
            return;
        }
        res.status(200).json(deletePost);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

module.exports = router;

