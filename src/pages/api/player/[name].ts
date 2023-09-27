import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma';
import apiHandler from '../../../middleware/apiHandler';

// TODO: this route should include info only on request, not always

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { name } = req.query;

  const player = await prisma.players.findFirst({
    where: { name: String(name) },
    select: {
      accounts: {
        select: {
          players: { select: { name: true, level: true, vocation: true } },
        },
      },
      player_deaths: true,
      name: true,
      sex: true,
      vocation: true,
      level: true,
      lastlogin: true,
      group_id: true,
      town_id: true,
    },
  });

  if (player) {
    res.json({ success: true, args: { player } });
  } else {
    res.status(404).json({ success: false, message: 'Not found.' });
  }
};

export default apiHandler({
  get,
});
