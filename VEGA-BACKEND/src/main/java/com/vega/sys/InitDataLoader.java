package com.vega.sys;
//package com.proxymed.gma;
//
//import java.util.List;
//
//import org.apache.commons.lang3.RandomStringUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.ApplicationArguments;
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.stereotype.Component;
//
//import com.proxymed.gma.controller.EtatInstallationRestController;
//import com.proxymed.gma.model.BonTravail;
//import com.proxymed.gma.model.Classification;
//import com.proxymed.gma.model.Compteur;
//import com.proxymed.gma.model.Criticite;
//import com.proxymed.gma.model.DemandeTravail;
//import com.proxymed.gma.model.EtatInstallation;
//import com.proxymed.gma.model.Famille;
//import com.proxymed.gma.model.Fournisseur;
//import com.proxymed.gma.model.ModeGestion;
//import com.proxymed.gma.model.Occurence;
//import com.proxymed.gma.model.Origine;
//import com.proxymed.gma.model.Personnel;
//import com.proxymed.gma.model.Service;
//import com.proxymed.gma.model.StatutDemandeTravail;
//import com.proxymed.gma.model.TypeTravail;
//import com.proxymed.gma.model.UniteCompteur;
//import com.proxymed.gma.repository.BonTravailRepository;
//import com.proxymed.gma.repository.ClassificationRepository;
//import com.proxymed.gma.repository.CompteurRepository;
//import com.proxymed.gma.repository.CriticiteRepository;
//import com.proxymed.gma.repository.DemandeTravailRepository;
//import com.proxymed.gma.repository.EtatInstallationRepository;
//import com.proxymed.gma.repository.FamilleRepository;
//import com.proxymed.gma.repository.FournisseurRepository;
//import com.proxymed.gma.repository.ModeGestionRepository;
//import com.proxymed.gma.repository.OccurenceRepository;
//import com.proxymed.gma.repository.OrigineRepository;
//import com.proxymed.gma.repository.PersonnelRepository;
//import com.proxymed.gma.repository.ServiceRepository;
//import com.proxymed.gma.repository.StatutDemandeTravailRepository;
//import com.proxymed.gma.repository.TypeTravailRepository;
//import com.proxymed.gma.repository.UniteCompteurRepository;
//
//@Component
//public class InitDataLoader implements ApplicationRunner {
//	@Autowired
//	UniteCompteurRepository uniteCompteurRepository;
//
//	@Autowired
//	PersonnelRepository personnelRepository;
//
//	@Autowired
//	CompteurRepository compteurRepository;
//
//	@Autowired
//	FamilleRepository familleRepository;
//
//	@Autowired
//	OccurenceRepository occurenceRepository;
//
//	@Autowired
//	CriticiteRepository criticiteRepository;
//
//	@Autowired
//	ServiceRepository serviceRepository;
//
//	@Autowired
//	ClassificationRepository classificationRepository;
//
//	@Autowired
//	EtatInstallationRepository etatInstallationRepository;
//
//	@Autowired
//	TypeTravailRepository typeTravailRepository;
//
//	@Autowired
//	FournisseurRepository fournisseurRepository;
//
//	@Autowired
//	OrigineRepository origineRepository;
//
//	@Autowired
//	ModeGestionRepository modeGestionRepository;
//
//	@Autowired
//	StatutDemandeTravailRepository statutDemandeTravailRepository;
//
//	@Autowired
//	BonTravailRepository bonTravailRepository;
//	
//	@Autowired
//	DemandeTravailRepository demandeTravailRepository;
//
//	@Override
//	public void run(ApplicationArguments args) throws Exception {
//		createPersonnel();
//		createFournisseurs();
//		createCompteurs();
//		createModeGestion();
//		createStatuts();
//		createOrigines();
//		createFamilles();
//
//		Occurence o1 = occurenceRepository.save(new Occurence(null, "PER", "Périodique"));
//		occurenceRepository.save(new Occurence(null, "OCC", "Occasionnel"));
//		occurenceRepository.save(new Occurence(null, "IMP", "Imprévu ( pannes )"));
//		createTypeTravails(o1);
//		createEtatInstalls();
//		createCriticites();
//		createServices();
//		createClassifications();
//		createBT();
//		createDT();
//	}
//
//	private void createModeGestion() {
//		modeGestionRepository.save(new ModeGestion(null, "SEM", "Semaine"));
//		modeGestionRepository.save(new ModeGestion(null, "MO", "Mois"));
//		modeGestionRepository.save(new ModeGestion(null, "CPT", "Compteur"));
//	}
//
//	private void createCompteurs() {
//		uniteCompteurRepository.save(new UniteCompteur(null, "CY", "Cycle"));
//		UniteCompteur u2 = uniteCompteurRepository.save(new UniteCompteur(null, "HE", "Heure"));
//		uniteCompteurRepository.save(new UniteCompteur(null, "KM", "Kilomètre"));
//		uniteCompteurRepository.save(new UniteCompteur(null, "UP", "Unité produite"));
//		UniteCompteur u1 = uniteCompteurRepository.save(new UniteCompteur(null, "LT", "Litres"));
//		UniteCompteur u3 = uniteCompteurRepository.save(new UniteCompteur(null, "KW", "KiloWatt/Heures"));
//
//		compteurRepository.save(new Compteur(null, "Grand adoucisseur", "Grand adoucisseur ", u1));
//		compteurRepository.save(new Compteur(null, "Electrique", "Electrique", u3));
//		compteurRepository.save(new Compteur(null, "Pompe à vide hôpital", "Pompe à vide hôpital", u1));
//	}
//
//	public int getRandomInt() {
//		return 5 + (int) (Math.random() * (7 - 2));
//	}
//
//	private void createBT() {
//		List<StatutDemandeTravail> list = statutDemandeTravailRepository.findAll();
//		List<EtatInstallation> list2 = etatInstallationRepository.findAll();
//		List<TypeTravail> list3 = typeTravailRepository.findAll();
//		for (TypeTravail t : list3)
//			for (EtatInstallation e : list2)
//				for (StatutDemandeTravail s : list) {
//					for (int i = 1; i < getRandomInt(); i++)
//						bonTravailRepository.save(new BonTravail(null, RandomStringUtils.random(12, true, false),
//								RandomStringUtils.random(20, true, false), RandomStringUtils.random(60, true, false),
//								(double) getRandomInt(), true, e, t, s));
//				}
//
//	}
//
//	private void createDT() {
//		List<StatutDemandeTravail> list = statutDemandeTravailRepository.findAll();
//		List<EtatInstallation> list2 = etatInstallationRepository.findAll();
//		List<TypeTravail> list3 = typeTravailRepository.findAll();
//		List<Personnel> list4 = personnelRepository.findAll();
//		for (Personnel p : list4)
//			for (TypeTravail t : list3)
//				for (EtatInstallation e : list2)
//					for (StatutDemandeTravail s : list) {
//						for (int i = 1; i < getRandomInt(); i++)
//							demandeTravailRepository.save(new DemandeTravail(null, RandomStringUtils.random(12, true, false),
//									RandomStringUtils.random(20, true, false),
//									RandomStringUtils.random(60, true, false), (double) getRandomInt(),getRandomInt(), true, e, t, s,p));
//					}
//
//	}
//
//	private void createClassifications() {
//		classificationRepository.save(new Classification(null, "Traitement air", "Traitement air"));
//		classificationRepository.save(new Classification(null, "Autres centrale énergie", "Autres centrale énergie"));
//		classificationRepository.save(new Classification(null, "Chambre d'isolement", "Chambre d'isolement"));
//		classificationRepository.save(new Classification(null, "Eau glacée", "Eau glacée"));
//		classificationRepository.save(new Classification(null, "Chauffage", "Chauffage"));
//		classificationRepository.save(new Classification(null, "Teletubee", "Teletube"));
//		classificationRepository.save(new Classification(null, "Locaux technique", "Locaux technique"));
//		classificationRepository.save(new Classification(null, "Eau", "Eau"));
//		classificationRepository.save(new Classification(null, "Eau adoucie", "Eau adoucie"));
//		classificationRepository.save(new Classification(null, "Glace", "Glace"));
//		classificationRepository.save(new Classification(null, "Lave panne", "Lave panne"));
//		classificationRepository
//				.save(new Classification(null, "Distributeur de vetements", "Distributeur de vetements"));
//		classificationRepository.save(new Classification(null, "Clim individuelle", "Clim individuelle"));
//		classificationRepository.save(new Classification(null, "Hottes", "Hottes"));
//		classificationRepository
//				.save(new Classification(null, "Salles quartier opératoires", "Salles quartier opératoires"));
//		classificationRepository.save(new Classification(null, "Epurateur d'air", "Epurateur d'air"));
//		classificationRepository.save(new Classification(null, "Air Comprimé", "Air Comprimé"));
//		classificationRepository.save(new Classification(null, "Stérilisation", "Stérilisation"));
//		classificationRepository.save(new Classification(null, "Haute Tension", "Haute Tension"));
//		classificationRepository.save(new Classification(null, "SIEMENS  GTC", "SIEMENS  GTC"));
//		classificationRepository.save(new Classification(null, "SECURITE", "SECURITE"));
//	}
//
//	private void createServices() {
//		serviceRepository.save(new Service(null, "EL", "Electrique"));
//		serviceRepository.save(new Service(null, "MC", "Multi compétenceé"));
//		serviceRepository.save(new Service(null, "ME", "Mécanique"));
//		serviceRepository.save(new Service(null, "OPEL", "Opérateur Electrique"));
//		serviceRepository.save(new Service(null, "OPMC", "Opérateur Multi compétence"));
//		serviceRepository.save(new Service(null, "OPME", "Opérateur Mécanique"));
//		serviceRepository.save(new Service(null, "OPSC", "Opérateur Sans compétence"));
//		serviceRepository.save(new Service(null, "SC", "Sans compétence"));
//		serviceRepository.save(new Service(null, "STEL", "Sous-traitant Electrique"));
//		serviceRepository.save(new Service(null, "STMC", "Sous-traitant Multi compétence"));
//		serviceRepository.save(new Service(null, "STME", "Sous-traitant Mécanique"));
//		serviceRepository.save(new Service(null, "STSC", "Sous-traitant Sans compétence"));
//	}
//
//	private void createCriticites() {
//		criticiteRepository.save(new Criticite(null, "AM", "Très Haute Criticité"));
//		criticiteRepository.save(new Criticite(null, "HC", "Haute Criticité"));
//		criticiteRepository.save(new Criticite(null, "CN", "Criticité Normale"));
//		criticiteRepository.save(new Criticite(null, "BC", "Basse Criticité"));
//		criticiteRepository.save(new Criticite(null, "TBC", "Très Basse Criticité"));
//	}
//
//	private void createEtatInstalls() {
//		etatInstallationRepository.save(new EtatInstallation(null, "PER", "Arrêt Machine"));
//		etatInstallationRepository.save(new EtatInstallation(null, "AS", "Arrêt Secteur"));
//		etatInstallationRepository.save(new EtatInstallation(null, "MM", "Marche Machine"));
//		etatInstallationRepository.save(new EtatInstallation(null, "NS", "Non Spécifié"));
//	}
//
//	private void createTypeTravails(Occurence o1) {
//		typeTravailRepository.save(new TypeTravail(null, "EP", "Entretien Préventif", o1));
//		typeTravailRepository.save(new TypeTravail(null, "INS&CTL", "Inspection / Contrôle", o1));
//		typeTravailRepository.save(new TypeTravail(null, "MOD", "Modification", o1));
//		typeTravailRepository.save(new TypeTravail(null, "NETT", "Nettoyage", o1));
//		typeTravailRepository.save(new TypeTravail(null, "DEP", "Dépannage", o1));
//		typeTravailRepository.save(new TypeTravail(null, "REP", "Réparation", o1));
//		typeTravailRepository.save(new TypeTravail(null, "SEC", "Sécurité", o1));
//		typeTravailRepository.save(new TypeTravail(null, "TR-N", "Travail Neuf", o1));
//	}
//
//	private void createFamilles() {
//		familleRepository.save(new Famille(null, "Filtre", "Filtre"));
//		familleRepository.save(new Famille(null, "Anti-Scalent", "Anti-Scalent"));
//		familleRepository.save(new Famille(null, "Régulateur", "Régulateus"));
//		familleRepository.save(new Famille(null, "Servo-moteur", "Servo-moteur"));
//		familleRepository.save(new Famille(null, "Sondes Temp", "Sondes Tem"));
//		familleRepository.save(new Famille(null, "Filtres à poches", "Filtres à poches"));
//		familleRepository.save(new Famille(null, "Filtres absolus", "Filtres absolus"));
//		familleRepository.save(new Famille(null, "Courroies", "Courroies"));
//		familleRepository.save(new Famille(null, "Filtre charbon actif", "Filtre charbon actif"));
//	}
//
//	private void createOrigines() {
//		origineRepository.save(new Origine(null, "Cause intrinsèque détectable", "Cause intrinsèque détectable"));
//		origineRepository
//				.save(new Origine(null, "Cause intrinsèque non-détectablee", "Cause intrinsèque non-détectable"));
//		origineRepository.save(new Origine(null, "Défaut entretien", "Défaut entretien"));
//		origineRepository
//				.save(new Origine(null, "Mauvaise intervention antérieure", "Mauvaise intervention antérieure"));
//		origineRepository.save(new Origine(null, "Erreur de conduite", "Erreur de conduite"));
//		origineRepository.save(new Origine(null, "Consignes non respectées", "Consignes non respectées"));
//		origineRepository.save(new Origine(null, "Défaillance seconde", "Défaillance seconde"));
//		origineRepository.save(new Origine(null, "Déréglage", "Déréglage"));
//		origineRepository.save(new Origine(null, "Autres causes", "Autres causes"));
//		origineRepository.save(new Origine(null, "Défaillance imprévisible", "Défaillance imprévisible"));
//	}
//
//	private void createStatuts() {
//		statutDemandeTravailRepository.save(new StatutDemandeTravail(null, "DEM", "Demandé"));
//		statutDemandeTravailRepository.save(new StatutDemandeTravail(null, "REF", "Refusé"));
//		statutDemandeTravailRepository.save(new StatutDemandeTravail(null, "APP", "Approuvé"));
//		statutDemandeTravailRepository.save(new StatutDemandeTravail(null, "PREP", "Préparé"));
//	}
//
//	private void createPersonnel() {
//		personnelRepository.save(new Personnel(null, "SAIT", "AIT SAID", "Souhail"));
//		personnelRepository.save(new Personnel(null, "YAIT", "AIT SAID", "Younes"));
//		personnelRepository.save(new Personnel(null, "SBAH", "Bahiaoui", "Salman"));
//		personnelRepository.save(new Personnel(null, "KAIT", "AIT SAID", "Khalid"));
//	}
//
//	private void createFournisseurs() {
//		fournisseurRepository.save(new Fournisseur(null, "AAF S.A./N.V.", "Frédéric D’heygere", "0475 / 87.06.90",
//				"Avenue de Louise, 149 bt 24", 1050, "Bruxelles", "02 / 426.54.51", " 02 / 426.74.15",
//				" Filtres pour ventilation"));
//		fournisseurRepository.save(
//				new Fournisseur(null, "ABS s.a.", " Mme Naeye", "0497 / 47.41.26", "  Chaussée d’Haacht, 56", 1930,
//						"Zaventem (Nossegem )", "02 / 411.33.33", " 02 / 755.36.98", " Filtres pour ventilation"));
//		fournisseurRepository
//				.save(new Fournisseur(null, "Armstrong", "Mr. Germin", "0475 / 12.28.65", "Parc Ind. Des Hauts Sarts",
//						4040, "Herstal", "02 / 426.54.51", " 02 / 410.85.95", " Filtres pour ventilation"));
//		fournisseurRepository.save(new Fournisseur(null, "Atlas Copco Compressors", "Frédéric D’heygere",
//				"0475 / 19.97.98", " Brusselsestw, 346", 3090, "Overijse", "02 / 425.36.39", " 02 / 426.74.15",
//				" Filtres pour ventilation"));
//		fournisseurRepository.save(new Fournisseur(null, "BetzDearborn S.A.BetzDearborn S.A.", "Verheyden Danny",
//				"0475 / 14.52.63", "Toekomstlaan, 54", 220, "Herentals", "02 / 123.36.36", " 02 / 426.74.15",
//				" Filtres pour ventilation"));
//		fournisseurRepository.save(
//				new Fournisseur(null, "Camfil S.A..", "Philipe Kieffer", "0475 / 63.32.36", " Av. Mommaerts, 10/12",
//						1140, "Bruxelles", "02 / 865.36.36", " 02 / 426.74.15", " Filtres pour ventilation"));
//		fournisseurRepository
//				.save(new Fournisseur(null, "Cebeo", "Philipe Block", "0475 / 62.53.23", "Rue du Bassin Collecteur, 5",
//						1130, "Bruxelles", "02 / 741.52.32", " 02 / 426.74.15", " Filtres pour ventilation"));
//		fournisseurRepository
//				.save(new Fournisseur(null, "Ciat Belgium", "Marc Deschutener", "0475 / 33.69.96", "Av. J. Wybran, 45",
//						1080, "Bruxelles", "02 / 545.36.99", " 02 / 426.74.15", " Filtres pour ventilation"));
//		fournisseurRepository.save(new Fournisseur(null, "Culligan S.A.", null, null, "Rue R. Stijns, 78B", 1601,
//				"Ruisbroek", "02 / 52.62.63", " 02 / 754.66.59", " Filtres pour ventilation"));
//		fournisseurRepository.save(
//				new Fournisseur(null, "Danfoss S.A..", "Van de Vel Danny", "0475 / 21.36.36", " Av. Paul Gilson, 45-49",
//						1070, "Anderlecht", "02 / 748.66.6", " 02 / 426.74.15", " Filtres pour ventilation"));
//		fournisseurRepository
//				.save(new Fournisseur(null, "Deckers", null, null, "Researchpark Haasrode  InterleuvenLaan, 12", 3001,
//						"Heverlee", "02 / 452.39.58", " 02 / 748.36.96", " Filtres pour ventilation"));
//		fournisseurRepository.save(new Fournisseur(null, "EDM", null, null, "Chaussée de Jette, 572", 1900, "Bruxelles",
//				"02 / 32.21.63", " 02 / 875.63.36", " Filtres pour ventilation"));
//		fournisseurRepository.save(new Fournisseur(null, "Grundfos Bellux s.a.", null, null, "Boomsesteenweg, 81-83",
//				2630, "Oudenaarde", "02 / 32.57.96", " 02 / 452.369-.36", " Filtres pour ventilation"));
//		fournisseurRepository.save(
//				new Fournisseur(null, "Nassau", "Jan Vandelock ", "0475 / 52.32.44", "  Industriezone De Bruwaan, 75",
//						9700, "Oudenaarde", "02 / 456.36.96", " 02 / 426.74.15", " Filtres pour ventilation"));
//	}
//
//}
