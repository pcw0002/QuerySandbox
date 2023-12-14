import prisma from '../../lib/prisma'

  // @ts-ignore
export default async function handle(req, res) {
  const { id, firstName, lastName, age } = req.body;
  try {
    const result = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        age: parseInt(age),
      },
    });

    const invalidateQuery = ['allUsers']
    res.status(200).json({shouldInvalidate: true, invalidateQuery});
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while updating user." });
  }
}