import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  useTheme,
  Container,
  Paper,
  Typography,
  Stack,
  Divider,
  alpha,
  Fade,
  useMediaQuery,
} from "@mui/material";
import Header from "@/presentation/components/dashboard/HeaderDashboard";
import GroupsListCard from "@/presentation/components/dashboard/GroupsListCard";
import CreateGroupDialog from "@/presentation/components/dashboard/CreateGroupDialog";
import { useModal } from "@/application/contexts/ModalContext";
import { addMember, getGroupsByUser } from "@/domain/usecases/groups";
import {
  deleteInvitation,
  getInvitationbyEmail,
} from "@/domain/usecases/invitations";
import { useAuth } from "@/application/contexts/AuthContext";

const Main = () => {
  const theme = useTheme();

  // Estados para grupos e invitaciones
  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [invitations, setInvitations] = useState([]);
  const [loadingInvitations, setLoadingInvitations] = useState(true);

  // Contextos
  const { user } = useAuth();
  const { isGroupModalOpen, closeGroupModal } = useModal();

  // Función para cargar invitaciones
  const loadInvitations = async () => {
    try {
      setLoadingInvitations(true);
      const invitationsData = await getInvitationbyEmail(user.email);
      setInvitations(invitationsData || []);
    } catch (error) {
      console.error("Error cargando invitaciones:", error);
      setInvitations([]);
    } finally {
      setLoadingInvitations(false);
    }
  };

  // Función para cargar grupos
  const loadGroups = async () => {
    try {
      setLoadingGroups(true);
      const groupsData = await getGroupsByUser(user.uid);
      setGroups(groupsData || []);
    } catch (error) {
      console.error("Error cargando grupos:", error);
      setGroups([]);
    } finally {
      setLoadingGroups(false);
    }
  };

  // Cargar datos cuando el usuario está autenticado
  useEffect(() => {
    if (user?.email && user?.uid) {
      // Usar Promise.all para cargar invitaciones y grupos en paralelo
      setLoadingInvitations(true);
      setLoadingGroups(true);

      Promise.all([getInvitationbyEmail(user.email), getGroupsByUser(user.uid)])
        .then(([invitationsData, groupsData]) => {
          setInvitations(invitationsData || []);
          setGroups(groupsData || []);
        })
        .catch((error) => {
          console.error("Error cargando datos:", error);
          setInvitations([]);
          setGroups([]);
        })
        .finally(() => {
          setLoadingInvitations(false);
          setLoadingGroups(false);
        });
    }
  }, [user]);

  // Manejar aceptación de invitación
  const handleAcceptInvitation = async (invitationId, groupId) => {
    try {
      // Ejecutar ambas operaciones en paralelo
      await Promise.all([
        addMember(groupId, user),
        deleteInvitation(invitationId),
      ]);

      // Cargar invitaciones y grupos en paralelo
      Promise.all([getInvitationbyEmail(user.email), getGroupsByUser(user.uid)])
        .then(([invitationsData, groupsData]) => {
          setInvitations(invitationsData || []);
          setGroups(groupsData || []);
        })
        .catch((error) => {
          console.error("Error cargando datos:", error);
        });
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  // Manejar rechazo de invitación
  const handleRejectInvitation = async (invitationId) => {
    try {
      await deleteInvitation(invitationId);
      loadInvitations();
    } catch (error) {
      console.error("Error rejecting invitation:", error);
    }
  };

  // Manejar creación de grupo
  const handleCreateGroup = async () => {
    loadGroups();
  };

  // Detectar si es un dispositivo móvil
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Fade in={true} timeout={800}>
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 2, sm: 4 },
          px: { xs: 1, sm: 3, md: 4 },
          maxWidth: { xs: "100%", sm: "lg" },
        }}
      >
        {/* Encabezado */}
        <Box sx={{ mb: { xs: 2, sm: 4 } }}>
          <Header />
        </Box>

        {/* Contenido principal */}
        <Box
          sx={{
            borderRadius: { xs: 3, sm: 4 },
            overflow: "hidden",
            mb: 4,
            mx: { xs: -1, sm: 0 }, // Compensar el padding en móviles para usar todo el ancho
            width: { xs: "calc(100% + 16px)", sm: "100%" }, // Ajustar el ancho en móviles
          }}
        >
          <GroupsListCard
            groups={groups}
            loadingGroups={loadingGroups}
            invitations={invitations}
            loadingInvitations={loadingInvitations}
            onAccept={handleAcceptInvitation}
            onReject={handleRejectInvitation}
            isMobile={isMobile}
          />
        </Box>

        {/* Diálogo para crear grupo */}
        <CreateGroupDialog
          isOpen={isGroupModalOpen}
          onClose={closeGroupModal}
          onGroupCreated={handleCreateGroup}
        />
      </Container>
    </Fade>
  );
};

export default Main;
