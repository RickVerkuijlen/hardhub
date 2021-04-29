package nl.rickverkuijlen.hardhub.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import io.vertx.core.json.JsonObject;
import nl.rickverkuijlen.hardhub.logic.PlaylistLogic;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/playlist")
public class PlaylistController {

    @Inject
    PlaylistLogic playlistLogic;

    @GET
    public Response getAllPlaylists() {
        try {
            return Response
                    .status(Response.Status.OK)
                    .entity(playlistLogic.getAllPlaylists())
                    .type(MediaType.APPLICATION_JSON_TYPE)
                    .build();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage())
                    .type(MediaType.TEXT_PLAIN)
                    .build();
        }
    }

    @GET
    @Path("{id}")
    public Response getPlaylistById(@PathParam("id") String id) {
        try {
            return Response
                    .status(Response.Status.OK)
                    .entity(playlistLogic.getPlaylistById(Integer.parseInt(id)))
                    .type(MediaType.APPLICATION_JSON_TYPE)
                    .build();
        } catch (Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage())
                    .type(MediaType.TEXT_PLAIN)
                    .build();
        }
    }

    @POST
    @Path("{id}")
    @Transactional
    @Consumes(MediaType.TEXT_PLAIN)
    public Response addSongToPlaylist(@PathParam("id") String id, String songId) {
        System.out.println(Integer.parseInt(songId));
        try {
            return Response
                    .status(Response.Status.ACCEPTED)
                    .entity(playlistLogic.addSongToPlaylist(Integer.parseInt(id), Integer.parseInt(songId)))
                    .type(MediaType.APPLICATION_JSON_TYPE)
                    .build();
        } catch(Exception e) {
            return Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage())
                    .type(MediaType.TEXT_PLAIN)
                    .build();
        }
    }


}
