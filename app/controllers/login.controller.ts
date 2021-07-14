import { Router, Request, Response } from 'express';

const router: Router = Router();

/**
 * 合工大2021新版门户CAS统一验证
 */
router.get('/cas', (req: Request, res: Response) => {
  let { name } = req.params;
    res.send('你, World!' + name);
});

export const LoginController: Router = router;
