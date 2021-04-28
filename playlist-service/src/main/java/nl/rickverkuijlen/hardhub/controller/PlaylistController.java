package nl.rickverkuijlen.hardhub.controller;

import nl.rickverkuijlen.hardhub.logic.PlaylistLogic;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
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



}
