import prisma from '../../lib/prisma'

  // @ts-ignore
export default async function handle(req, res) {
  try {
    const result = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        age: true,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured while fetching users." });
  }
}