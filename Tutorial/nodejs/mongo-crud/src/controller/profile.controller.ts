import { UpdateProfileInput } from "./../schema/profile.schema";
import { Request, Response } from "express";
import * as profile from "../service/profile.service";
import log from "../utils/logger";
import { CreateProfileInput, FindProfileById } from "../schema/profile.schema";
import mongoose from "mongoose";

export async function findProfileHandler(req: Request, res: Response) {
  try {
    const result = await profile.findProfile();

    return res.status(200).send(result);
  } catch (error: any) {
    log.error(`Error findProfileHandler: ${error.message}`);

    if (error.status) return res.status(error.status).send(error.message);
    return res.status(500).send(error);
  }
}

export async function findProfilebyIdHandler(
  req: Request<FindProfileById>,
  res: Response
) {
  try {
    const id = req.params.id;
    const result = await profile.findProfileById(id);

    return res.status(200).send(result);
  } catch (error: any) {
    log.error(`Error findProfilebyIdHandler: ${error.message}`);

    if (error.status) return res.status(error.status).send(error.message);
    return res.status(500).send(error);
  }
}

export async function createProfileHandler(
  req: Request<{}, {}, CreateProfileInput>,
  res: Response
) {
  try {
    const body = req.body;
    await profile.createProfile(body);

    return res.status(200).send("User successfully created");
  } catch (error: any) {
    log.error(`Error createProfileHandler: ${error.message}`);

    if (error.status) return res.status(error.status).send(error.message);
    return res.status(500).send(error);
  }
}

export async function updateProfileHandler(
  req: Request<UpdateProfileInput["params"], {}, UpdateProfileInput["body"]>,
  res: Response
) {
  try {
    const id = req.params.id;
    const body = req.body;
    await profile.updateProfile(id, body);

    res.status(200).send("User successfully updated");
  } catch (error: any) {
    log.error(`Error updateProfileHandler: ${error.message}`);

    if (error.status) return res.status(error.status).send(error.message);
    return res.status(500).send(error);
  }
}

export async function deleteProfileHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await profile.deleteProfile(id);

    res.status(200).send("User successfully deleted");
  } catch (error: any) {
    log.error(`Error deleteProfileHandler: ${error.message}`);

    if (error.status) return res.status(error.status).send(error.message);
    return res.status(500).send(error);
  }
}
