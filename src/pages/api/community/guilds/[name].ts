import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { name, id },
  } = req;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    let guild;
    if (name) {
      guild = await prisma.guilds.findUnique({
        where: { name: String(name) },
        include: {
          guild_membership: {
            include: {
              players: {
                select: {
                  name: true,
                  level: true,
                  vocation: true,
                },
              },
            },
          },
        },
      });
    } else if (id) {
      guild = await prisma.guilds.findUnique({
        where: { id: Number(id) },
        include: { guild_membership: true },
      });
    } else {
      return res
        .status(400)
        .json({ message: 'Name or ID parameter is required' });
    }

    if (!guild) {
      return res.status(404).json({ message: 'Guild not found' });
    }

    res.status(200).json({ success: true, args: { data: guild } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
};

export default handler;
