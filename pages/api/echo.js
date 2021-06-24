export default function echo (req, res) {
    res.status(200)
    .json({status: 'success', message: req.query.message ?? 'Base message'});
}